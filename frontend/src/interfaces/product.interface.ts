export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  img?: string;
  available?: number;
  status?: boolean;
  createBy: string;
  updateBy: string;
  updatedAt?: string;
  createdAt?: string;
}
