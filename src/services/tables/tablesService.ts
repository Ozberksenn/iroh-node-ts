import { getDbPool } from "../../config/db";
import { Table } from "../../types/table";


export async function getTablesService(): Promise<Table[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Tables');
    return result.recordset as Table[];
}

export async function insertTableService(data: Table): Promise<Table> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("name", data.name)
    .execute('usp_InsertTable');
  return result.recordset[0];
}


export async function updateTableService(data: Table): Promise<Table> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("name", data.name)
    .execute('usp_UpdateTable');
  return result.recordset[0];
}
