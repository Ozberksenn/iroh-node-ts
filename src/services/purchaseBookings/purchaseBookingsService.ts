import { getDbPool } from "../../config/db";

export async function getPurchaseBookingsByIdService(
  id: number
): Promise<any[]> {
  // tood : type yaz any olmasın.
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("purchaseId", id)
    .execute("usp_GetPurchaseBookingsById");

  return result.recordset.map((row) => ({
    ...row,
    booking: row.booking ? JSON.parse(row.booking) : null,
  }));
}
