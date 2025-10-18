import { getDbPool } from "../../config/db";
import { Purchase } from "../../types/purchase";


export async function getPurchasesService(): Promise<Purchase[]> {
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Purchases');
    return result.recordset as Purchase[];
}

export async function insertPurchaseService(data: Purchase): Promise<Purchase> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("hours", data.hours)
    .input("price", data.price)
    .input("customerId", data.customerId)
    .input("startDate", data.startDate)
    .input("endDate", data.endDate)
    .input("usedHours", data.usedHours)
    .execute('usp_InsertPurchase');
  return result.recordset[0];
}

export async function updatePurchaseService(data: Purchase): Promise<Purchase> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("hours", data.hours)
    .input("price", data.price)
    .input("customerId", data.customerId)
    .input("startDate", data.startDate)
    .input("endDate", data.endDate)
    .input("usedHours", data.usedHours)
    .execute('usp_UpdatePurchase');
  return result.recordset[0];
}

export async function deletePurchaseService(data: Purchase): Promise<Purchase> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .execute('usp_DeletePurchase');
  return result.recordset[0];
}
