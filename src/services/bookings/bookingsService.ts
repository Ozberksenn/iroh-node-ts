import { getDbPool } from "../../config/db";
import { Booking } from "../../types/booking";


export async function getBookingsService(): Promise<Booking[]> {
  const pool = await getDbPool();
  const result = await pool.request().query('SELECT * FROM vw_Bookings');
  return result.recordset as Booking[];
}

export async function getActiveBookingsService(): Promise<Booking[]> {
  const pool = await getDbPool();
  const result = await pool.request().query('SELECT * FROM vw_ActiveBookings');

  return result.recordset.map(r => {
    const table = typeof r.table === "string" ? JSON.parse(r.table) : r.table;

    const customer = typeof r.customer === "string" ? JSON.parse(r.customer) : r.customer;

    if (customer && customer.activePurchase && typeof customer.activePurchase === "string") {
      customer.activePurchase = JSON.parse(customer.activePurchase);
    }

    return {
      ...r,
      table,
      customer
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
    .execute('usp_InsertBooking');
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
    .execute('usp_UpdateBooking');
  return result.recordset[0];
}

