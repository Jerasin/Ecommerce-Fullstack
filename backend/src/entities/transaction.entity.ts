import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { User } from "./user.entity";

export interface TransactionProps extends BaseInterface {
  orderId: string;
  totalPrice: number;
  totalAmount: number;
  userId: User | number;
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId" })
  userId: User | number;
}
