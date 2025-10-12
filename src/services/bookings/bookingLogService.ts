import { getDbPool } from "../../config/db";
import { Booking, BookingLog } from "../../types/booking";


export async function getBookingLogsService(): Promise<BookingLog[]> {
  const pool = await getDbPool();
  const result = await pool.request().query('SELECT * FROM vw_BookingLogs');
  return result.recordset as BookingLog[];
}


export async function insertBookingLogService(data: BookingLog): Promise<BookingLog> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("bookingId", data.bookingId)
    .input("time", data.time)
    .input("type", data.type)
    .input("userId", data.userId)
    .execute('usp_InsertBookingLog');
  return result.recordset[0];
}

export async function insertLogTypeService(data: any): Promise<any> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("name", data.name)
    .execute('usp_LogType');
  return result.recordset[0];
}

export async function updateBookingLogService(data: BookingLog): Promise<BookingLog> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("bookingId", data.bookingId)
    .input("time", data.time)
    .input("type", data.type)
    .input("userId", data.userId)
    .execute('usp_UpdateBookingLog');
  return result.recordset[0];
}


export async function updateLogTypeService(data: any): Promise<any> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("name", data.name)
    .execute('usp_UpdateLogType');
  return result.recordset[0];
}
