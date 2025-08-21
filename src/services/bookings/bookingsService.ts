import { getDbPool } from "../../config/db";

export interface Bookings {
  id: number;
  tableName : string;
  customerName: string;
  customerLastName: string;
  customerParentName:string;
  customerParentLastName : string;
  customerPhone : string;
  customerMail : string;
  customerParentPhone : string;
  customerParentMail: string;
  startTime : Date;
  endTime : Date;
  startDate : Date;
  endDate : Date;
  status : boolean
}

export async function getBookingsService(): Promise<Bookings[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Bookings');
    return result.recordset as Bookings[];
}
