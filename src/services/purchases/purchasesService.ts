import { pool } from "../../config/db";
import { Purchase } from "../../types/purchase";

export async function getPurchasesService(): Promise<Purchase[]> {
  const { rows } = await pool.query("SELECT * FROM vw_purchases");
  return rows as Purchase[];
}

export async function getPurchaseByCustomerIdService(
  id: number,
): Promise<Purchase[]> {
  const { rows } = await pool.query(
    `SELECT * FROM fn_get_purchase_by_customer_id($1)`,
    [id],
  );
  return rows as Purchase[];
}

export async function insertPurchaseService(data: Purchase): Promise<Purchase> {
  const { rows } = await pool.query(
    "CALL usp_insert_purchase($1,$2,$3,$4,$5)",
    [data.hours, data.price, data.customerId, data.startDate, data.endDate],
  );
  return rows[0] as Purchase;
}

export async function updatePurchaseService(data: Purchase): Promise<Purchase> {
  const { rows } = await pool.query(
    "CALL usp_update_purchase($1,$2,$3,$4,$5,$6)",
    [
      data.id,
      data.hours,
      data.price,
      data.customerId,
      data.startDate,
      data.endDate,
    ],
  );
  return rows[0] as Purchase;
}

export async function deletePurchaseService(data: Purchase): Promise<Purchase> {
  const { rows } = await pool.query("CALL usp_delete_purchase($1)", [data.id]);
  return rows[0];
}
