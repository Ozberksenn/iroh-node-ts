import { getDbPool, pool } from "../../config/db";
import { Table } from "../../types/table";

export async function getTablesService(): Promise<Table[]> {
  const { rows } = await pool.query("SELECT * FROM vw_tables");
  return rows as Table[];
}

export async function insertTableService(data: Table): Promise<Table> {
  const { rows } = await pool.query("CALL usp_insert_table($1)", [data.name]);
  return rows[0] as Table;
}

export async function updateTableService(data: Table): Promise<Table> {
  const { rows } = await pool.query("CALL usp_update_table($1,$2)", [
    data.id,
    data.name,
  ]);
  return rows[0] as Table;
}

export async function deleteTableService(data: Table): Promise<Table> {
  const { rows } = await pool.query("CALL usp_delete_table($1)", [data.id]);
  return rows[0];
}
