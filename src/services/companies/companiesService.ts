import { getDbPool } from "../../config/db";
import { Company } from "../../types/company";


export async function getCompaniesService(): Promise<Company[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM   vw_Companies');
    console.log(result)
    return result.recordset as Company[];
}


export async function updateCompanyService(data: Company): Promise<Company> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("name", data.name)
    .input("firstHourPrice", data.firstHourPrice)
    .input("additionalHalfHourPrice", data.additionalHourPrice)
    .execute('usp_UpdateCompany');
  return result.recordset[0];
}
