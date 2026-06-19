import type { Provider, ProviderFormValues } from "../types/provider";
import { parseVndInput } from "./formatVnd";

export const providerToFormValues = (provider: Provider): ProviderFormValues => ({
  name: provider.name,
  phone: provider.phone ?? "",
  email: provider.email ?? "",
  address: provider.address ?? "",
  note: provider.note ?? "",
  debt: String(provider.debt ?? 0),
});

const buildProviderFields = (values: ProviderFormValues) => {
  const payload: Record<string, string | number> = {
    name: values.name.trim(),
    debt: parseVndInput(String(values.debt ?? "0")),
  };

  if (values.phone?.trim()) payload.phone = values.phone.trim();
  if (values.email?.trim()) payload.email = values.email.trim();
  if (values.address?.trim()) payload.address = values.address.trim();
  if (values.note?.trim()) payload.note = values.note.trim();

  return payload;
};

export const toProviderPayload = (values: ProviderFormValues) =>
  buildProviderFields(values);

export const toProviderUpdatePayload = (values: ProviderFormValues) =>
  buildProviderFields(values);
