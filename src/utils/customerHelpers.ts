import type { Customer, CustomerFormValues } from "../types/customer";

export const customerToFormValues = (
  customer: Customer,
): CustomerFormValues => ({
  name: customer.name,
  phone: customer.phone ?? "",
  email: customer.email ?? "",
  address: customer.address ?? "",
  note: customer.note ?? "",
  debt: String(customer.debt ?? 0),
});

export const toCustomerPayload = (values: CustomerFormValues) => {
  const payload: Record<string, string | number> = {
    name: values.name.trim(),
  };
  if (values.phone?.trim()) payload.phone = values.phone.trim();
  if (values.email?.trim()) payload.email = values.email.trim();
  if (values.address?.trim()) payload.address = values.address.trim();
  if (values.note?.trim()) payload.note = values.note.trim();
  if (values.debt !== undefined && values.debt !== "") {
    payload.debt = Number(values.debt);
  }
  return payload;
};
