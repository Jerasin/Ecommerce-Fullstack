import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { SaleOrder } from "./saleOrder.entity";

export interface TransactionProps extends BaseInterface {
  orderId: string;
  totalPrice: number;
  totalAmount: number;
}

@Entity("transaction")
export class Transaction extends Base implements TransactionProps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  orderId: string;

  @Column()
  totalPrice: number;

  @Column()
  totalAmount: number;
}
