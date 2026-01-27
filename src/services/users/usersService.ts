import { getDbPool } from "../../config/db";

export async function fetchUsersFromDb() {
    const pool = await getDbPool();
    // const result = await pool.request().query('SELECT * FROM vw_Users');
    // return result.recordset;
}