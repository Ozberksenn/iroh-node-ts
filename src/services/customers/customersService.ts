import { pool } from "../../config/db";
import { Customer } from "../../types/customer";
import { PaginatedResponse } from "../../types/paginated";

export async function getCustomersService(
  status?: "Customer" | "Subscriber" | "ActiveSubscriber",
  page?: number,
  size?: number,
  name?: string,
): Promise<PaginatedResponse<Customer>> {
  const currentPage = page ?? 1;
  const currentSize = size ?? 50;

  const { rows } = await pool.query(
    `
    SELECT *
    FROM fn_get_customers(
      $1, -- status
      $2, -- page
      $3, -- size
      $4  -- name
    )
    `,
    [status ?? null, currentPage, currentSize, name ?? null],
  );

  const rawItems = rows as (Customer & {
    totalCount: number; 
  })[];

  // 👇 totalSize sadece ilk kayıttan alınır
  const totalSize = rawItems.length > 0 ? rawItems[0].totalCount : 0;
  const totalPages =
    currentPage === -1 ? 1 : Math.ceil(totalSize / currentSize);

  // 👇 totalcount'u item'lardan SÖKÜYORUZ
  const items: Customer[] = rawItems.map(
    ({ totalCount, ...customer }) => customer,
  );

  return {
    items,
    page: currentPage,
    size: currentSize,
    totalPages,
    totalSize,
  };
}

export async function insertCustomerService(data: Customer): Promise<Customer> {
  const { rows } = await pool.query(
    "CALL usp_insert_customer($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      data.name,
      data.lastName,
      data.parentName,
      data.parentLastName,
      data.phone,
      data.mail,
      data.parentPhone,
      data.parentMail,
    ],
  );
  return rows[0];
}

export async function updateCustomerService(data: Customer): Promise<Customer> {
  const { rows } = await pool.query(
    "CALL usp_update_customer($1,$2,$3,$4,$5,$6,$7,$8,$9)",
    [
      data.id,
      data.name,
      data.lastName,
      data.parentName,
      data.parentLastName,
      data.phone,
      data.mail,
      data.parentPhone,
      data.parentMail,
    ],
  );
  return rows[0];
}

export async function deleteCustomerService(data: Customer): Promise<Customer> {
  const { rows } = await pool.query("CALL usp_delete_customer($1)", [data.id]);
  return rows[0];
}
