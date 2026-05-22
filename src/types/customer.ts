export interface Customer {
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

export interface CustomerFormValues {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  note?: string;
  debt: string;
}
