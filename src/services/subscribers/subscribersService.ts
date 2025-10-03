import { getDbPool } from "../../config/db";
import { Subscriber } from "../../types/subscriber";


export async function getSubscribersService(): Promise<Subscriber[]>{
    const pool = await getDbPool();
    const result = await pool.request().query('SELECT * FROM vw_Subscribers');
    console.log(result)
    return result.recordset as Subscriber[];
}

export async function insertSubscriberService(data: Subscriber): Promise<Subscriber> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("name", data.name)
    .input("lastName", data.lastName)
    .input("parentName", data.parentName)
    .input("parentLastName", data.parentLastName)
    .input("phone", data.phone)
    .input("mail", data.mail)
    .input("parentPhone", data.parentPhone)
    .input("parentMail", data.parentMail)
    .input("isActive", data.isActive)
    .execute('usp_InsertSubscriber');
  return result.recordset[0];
}