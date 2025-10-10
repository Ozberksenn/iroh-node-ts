import { getDbPool } from "../../config/db";
import { Booking } from "../../types/booking";


export async function getBookingsService(): Promise<Booking[]> {
  const pool = await getDbPool();
  const result = await pool.request().query('SELECT * FROM vw_Bookings');
  return result.recordset as Booking[];
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
    .execute('usp_UpdateBooking');
  return result.recordset[0];
}

// Booking Status Services -------------------------------

export async function getBookingStatusesService(): Promise<any[]> {
  const pool = await getDbPool();
  const result = await pool.request().query('SELECT * FROM vw_BookingStatuses');
  return result.recordset as any[];
}

export async function insertBookingStatusService(data: any): Promise<any> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("name", data.name)
    .execute('usp_InsertBookingStatus');
  return result.recordset[0];
}

export async function updateBookingStatusService(data: any): Promise<any> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("name", data.name)
    .execute('usp_UpdateBookingStatus');
  return result.recordset[0];
}



