export interface Provider {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  debt: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProviderFormValues {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  debt: string; // string để dễ validate và nhập liệu, sẽ convert sang number khi submit
}
