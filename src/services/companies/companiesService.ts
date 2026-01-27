import { pool } from "../../config/db";
import { Company } from "../../types/company";

export async function getCompaniesService(): Promise<Company[]> {
  const { rows } = await pool.query("SELECT * FROM vw_companies");
  return rows as Company[];
}

export async function updateCompanyService(data: Company): Promise<Company> {
  const { rows } = await pool.query("CALL usp_update_company($1,$2,$3,$4)", [
    data.id,
    data.name,
    data.firstHourPrice,
    data.additionalHalfHourPrice,
  ]);
  return rows[0] as Company;
}
