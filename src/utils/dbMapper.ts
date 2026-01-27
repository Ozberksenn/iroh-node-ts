import camelcaseKeys from "camelcase-keys";

export function mapDbRows<T>(rows: any[]): T[] {
  return camelcaseKeys(rows, { deep: true });
}