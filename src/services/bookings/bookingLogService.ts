import { pool } from "../../config/db";
import { Booking, BookingLog } from "../../types/booking";

export async function getBookingLogsService(): Promise<BookingLog[]> {
  const { rows } = await pool.query("SELECT * FROM bookinglogs");
  return rows as BookingLog[];
}

export async function insertBookingLogService(
  data: BookingLog,
): Promise<BookingLog> {
  const { rows } = await pool.query(
    "CALL usp_insert_booking_log($1,$2,$3,$4)",
    [data.bookingId, data.time, data.type, data.userId],
  );
  return rows[0];
}

export async function updateBookingLogService(
  data: BookingLog,
): Promise<BookingLog> {
  const { rows } = await pool.query(
    "CALL usp_update_bookinglog($1,$2,$3,$4,$5)",
    [data.id, data.bookingId, data.time, data.type, data.userId],
  );
  return rows[0];
}
