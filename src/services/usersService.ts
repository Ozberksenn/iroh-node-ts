import { getDbPool } from "../config/db";

export async function fetchUsersFromDb() {
    const pool = await getDbPool();
    const result = await pool.request().query("SELECT TOP 10 * FROM users");
    return result.recordset;
}