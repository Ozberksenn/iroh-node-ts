import { getDbPool } from "../../config/db";

export interface Purchase {
    id: number;
    hours: number;
    price: number;
    startDate: Date;
    endDate: Date | null;
    purchasedHours: number;
    usedHours: number;
}

export async function getPurchasesService(): Promise<Purchase[]> {
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Purchases');
    return result.recordset as Purchase[];
}

