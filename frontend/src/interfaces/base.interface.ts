import { DateTime } from 'luxon';

export interface BaseInterface {
  createdAt?: DateTime;
  updatedAt?: DateTime;
  createBy?: string;
  updateBy?: string;
}

export interface BaseTypeOption {
  categoryId?: number;
  productId?: number;
}
