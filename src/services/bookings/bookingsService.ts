import { getDbPool } from "../../config/db";
import { Booking } from "../../types/booking";
import { PaginatedResponse } from "../../types/paginated";

export async function getBookingsService(
  page?: number,
  size?: number,
  name?:string
): Promise<PaginatedResponse<Booking>> {
  const currentPage = page ?? 1;
  const currentSize = size ?? 20;

  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("page", page)
    .input("size", size)
    .input("name", name ?? null)
    .execute("usp_GetBookings");

  const recordsets = result.recordsets as any[];

  const totalSize = recordsets[0]?.[0]?.TotalCount ?? 0;

  const items = (recordsets[1] ?? []) as Booking[];

  const totalPages =
    currentPage === -1 ? 1 : Math.ceil(totalSize / currentSize);

  const response = {
    items,
    page: currentPage,
    size: currentSize,
    totalPages: totalPages,
    totalSize,
  };

  return response;
}

export async function getActiveBookingsService(): Promise<Booking[]> {
  const pool = await getDbPool();
  const result = await pool.request().query("SELECT * FROM vw_ActiveBookings");

  return result.recordset.map((r) => {
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
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("tableId", data.tableId)
    .input("startTime", data.startTime)
    .input("endTime", data.endTime)
    .input("status", data.status)
    .input("price", data.price)
    .input("customerId", data.customerId)
    .input("note", data.note)
    .execute("usp_InsertBooking");
  return result.recordset[0];
}

export async function updateBookingService(data: Booking): Promise<Booking> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("tableId", data.tableId)
    .input("startTime", data.startTime)
    .input("endTime", data.endTime)
    .input("status", data.status)
    .input("price", data.price)
    .input("customerId", data.customerId)
    .input("note", data.note)
    .input("purchaseId", data.purchaseId)
    .execute("usp_UpdateBooking");
  return result.recordset[0];
}
