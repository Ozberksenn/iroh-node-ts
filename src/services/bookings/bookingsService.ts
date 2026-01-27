import { pool } from "../../config/db";
import { Booking } from "../../types/booking";
import { PaginatedResponse } from "../../types/paginated";

export async function getBookingsService(
  page?: number,
  size?: number,
  name?: string,
  mail?: string,
): Promise<PaginatedResponse<Booking>> {
  const currentPage = page ?? 1;
  const currentSize = size ?? 20;

  const { rows } = await pool.query(
    `
    SELECT *
    FROM usp_get_bookings(
      $1,
      $2,
      $3,
      $4
    )
    `,
    [currentPage, currentSize, name ?? null, mail ?? null],
  );

  const totalSize = rows.length > 0 ? Number(rows[0].totalCount) : 0;

  const items = rows.map((row: any) => {
    const { totalCount, ...booking } = row;

    return {
      ...booking,
      table: booking.table ?? null,
      customer: booking.customer ?? null,
    };
  }) as Booking[];

  const totalPages =
    currentPage === -1 ? 1 : Math.ceil(totalSize / currentSize);

  return {
    items,
    page: currentPage,
    size: currentSize,
    totalPages,
    totalSize,
  };
}

export async function getActiveBookingsService(): Promise<Booking[]> {
  const { rows } = await pool.query(`SELECT * FROM vw_activebookings`);

  return rows.map((r) => {
    const table = typeof r.table === "string" ? JSON.parse(r.table) : r.table;

    const customer =
      typeof r.customer === "string" ? JSON.parse(r.customer) : r.customer;

    if (
      customer &&
      customer.activePurchase &&
      typeof customer.activePurchase === "string"
    ) {
      customer.activePurchase = JSON.parse(customer.activePurchase);
    }

    const logs = typeof r.logs === "string" ? JSON.parse(r.logs) : r.logs;

    return {
      ...r,
      table,
      customer,
      logs,
    };
  });
}

export async function insertBookingService(data: Booking): Promise<Booking> {
  const { rows } = await pool.query(
    "SELECT * FROM fn_insert_booking($1,$2,$3,$4,$5,$6,$7)",
    [
      data.tableId,
      data.startTime,
      data.endTime,
      data.status,
      data.price,
      data.customerId,
      data.note,
    ],
  );
  if (rows.length === 0) {
    throw new Error("Booking insert failed");
  }

  return rows[0];
}

export async function updateBookingService(data: Booking): Promise<Booking> {
  const { rows } = await pool.query(
    "CALL usp_update_booking($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      data.id,
      data.tableId,
      data.customerId,
      data.startTime,
      data.endTime,
      data.status,
      data.price,
      data.note,
      data.purchaseId,
    ],
  );
  return rows[0];
}
