import type { Provider, ProviderFormValues } from "../types/provider";

export const providerToFormValues = (provider: Provider): ProviderFormValues => ({
  name: provider.name,
  phone: provider.phone ?? "",
  email: provider.email ?? "",
  address: provider.address ?? "",
  note: provider.note ?? "",
});

export const toProviderPayload = (values: ProviderFormValues) => {
  const payload: Record<string, string> = {
    name: values.name.trim(),
  };
  if (values.phone?.trim()) payload.phone = values.phone.trim();
  if (values.email?.trim()) payload.email = values.email.trim();
  if (values.address?.trim()) payload.address = values.address.trim();
  if (values.note?.trim()) payload.note = values.note.trim();
  return payload;
};
