import { getDbPool } from "../../config/db";
import { Booking } from "../../types/booking";


export async function getBookingsService(): Promise<Booking[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Bookings');
    return result.recordset as Booking[];
}

export async function getBookingStatusesService(): Promise<any[]>{
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