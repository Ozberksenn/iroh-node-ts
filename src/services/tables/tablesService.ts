import { getDbPool } from "../../config/db";

export interface Table {
  id: number;
  name: string;
}

export async function getTablesService(): Promise<Table[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Tables');
    console.log(result)
    return result.recordset as Table[];
}

