import { pool } from "../../config/db";
import { PurchasePayment } from "../../types/pruchasePayment";

export async function insertPurchasePaymentService(
  data: PurchasePayment,
): Promise<PurchasePayment> {
  const { rows } = await pool.query(
    `CALL usp_insert_purchase_payment($1,$2,$3)`,
    [data.purchaseId, data.hours, data.price],
  );

  return rows[0];
}
