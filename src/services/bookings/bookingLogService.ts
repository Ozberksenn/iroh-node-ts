import { getDbPool } from "../../config/db";
import { Booking, BookingLog } from "../../types/booking";


// export async function getBookingLogsService(): Promise<Booking[]>{
//     const pool = await getDbPool();
//     const result = await pool.request().query('SELECT * FROM vw_Bookings');
//     return result.recordset as Booking[];
// }


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