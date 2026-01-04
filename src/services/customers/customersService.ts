import { getDbPool } from "../../config/db";
import { Customer } from "../../types/customer";
import { PaginatedResponse } from "../../types/paginated";

export async function getCustomersService(
  status?: "Customer" | "Subscriber" | "ActiveSubscriber",
  page?: number,
  size?: number
): Promise<PaginatedResponse<Customer>> {
  const currentPage = page ?? 1;
  const currentSize = size ?? 50;

  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("status", status)
    .input("page", page)
    .input("size", size)
    .execute("usp_GetCustomers");

  // 👇 SQL'den gelen ham data
  const rawItems = result.recordset as (Customer & {
    TotalCount: number;
  })[];

  // 👇 totalSize sadece ilk kayıttan alınır
  const totalSize = rawItems.length > 0 ? rawItems[0].TotalCount : 0;
  const totalPages =
    currentPage === -1 ? 1 : Math.ceil(totalSize / currentSize);

  // 👇 TotalCount'u item'lardan SÖKÜYORUZ
  const items: Customer[] = rawItems.map(({ TotalCount, ...customer }) => customer);

  return {
    items,
    page: currentPage,
    size: currentSize,
    totalPages,
    totalSize,
  };
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
    .execute("usp_InsertCustomer");
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
    .execute("usp_UpdateCustomer");
  return result.recordset[0];
}

export async function deleteCustomerService(data: Customer): Promise<Customer> {
  const pool = await getDbPool();
  const result = await pool
    .request()
    .input("id", data.id)
    .execute("usp_DeleteCustomer");
  return result.recordset[0];
}
