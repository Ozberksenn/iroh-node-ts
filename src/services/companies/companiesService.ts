import { getDbPool } from "../../config/db";

export interface Company {
  id: number;
  name: string;
  firstHourPrice: number;
  additionalHourPrice: number;
}

export async function getCompaniesService(): Promise<Company[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM   vw_Companies');
    console.log(result)
    return result.recordset as Company[];
}

