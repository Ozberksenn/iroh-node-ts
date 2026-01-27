import { pool } from "../../config/db";

export async function getPurchaseBookingsByIdService(
  id: number,
): Promise<any[]> {
  const result = await pool.query(
    `SELECT * FROM usp_get_purchase_bookings_by_id($1)`,
    [id],
  );

  return result.rows.map((row) => ({
    ...row,
    booking: row.booking ? JSON.parse(row.booking) : null,
  }));
}
