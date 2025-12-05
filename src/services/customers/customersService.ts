import { getDbPool } from "../../config/db";
import { Customer } from "../../types/customer";


export async function getCustomersService(status?: 'Customer' | 'Subscriber' | 'ActiveSubscriber'): Promise<Customer[]> {
  const pool = await getDbPool();
  const result = await pool.request().input("status", status).execute('usp_GetCustomers');
  return result.recordset as Customer[];
}

export async function insertCustomerService(data: Customer): Promise<Customer> {
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
    .execute('usp_InsertCustomer');
  return result.recordset[0];
}

export async function updateCustomerService(data: Customer): Promise<Customer> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .input("name", data.name)
    .input("lastName", data.lastName)
    .input("parentName", data.parentName)
    .input("parentLastName", data.parentLastName)
    .input("phone", data.phone)
    .input("mail", data.mail)
    .input("parentPhone", data.parentPhone)
    .input("parentMail", data.parentMail)
    .execute('usp_UpdateCustomer');
  return result.recordset[0];
}

export async function deleteCustomerService(data: Customer): Promise<Customer> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .execute('usp_DeleteCustomer');
  return result.recordset[0];
}
