import { BaseInterface } from './base.interface';

export interface TransactionProps extends BaseInterface {
  orderId: string;
  totalPrice: number;
  totalAmount: number;
}

export interface Transaction extends TransactionProps {
  id: number;
}
