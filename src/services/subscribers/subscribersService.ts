import { getDbPool } from "../../config/db";

export interface Subscriber {
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

export async function getSubscribersService(): Promise<Subscriber[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Subscribers');
    console.log(result)
    return result.recordset as Subscriber[];
}

// export async function insertSubscribeService(): Promise<Subscriber>{
//   const pool = await getDbPool();
// }