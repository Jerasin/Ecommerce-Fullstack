import { DateTime } from 'luxon';

export interface BaseInterface {
  createdAt?: DateTime;
  updatedAt?: DateTime;
  createBy?: string;
  updateBy?: string;
}
