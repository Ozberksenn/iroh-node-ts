import { getDbPool } from "../../config/db";

export interface Customer {
  id: number;
  name: string;
  lastName: string;
  parentName: string;
  parentLastName: string;
  phone: string;
  mail: string;
  parentPhone: string;
  parentMail: string;
  startDate: Date;
  endDate: Date | null; 
  purchasedHours: number;
  usedHours: number;
  isActive: boolean;
}

export async function getCustomersService(): Promise<Customer[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Customers');
    console.log(result)
    return result.recordset as Customer[];
}

