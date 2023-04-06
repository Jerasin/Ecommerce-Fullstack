import { Entity, Column, OneToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";

export interface WareHouseProps {
  productId: number;
  amount: number;
}

@Entity("wareHouse")
export class WareHouse {
  @OneToOne(() => Product, (product) => product.id)
  @PrimaryColumn()
  productId: number;

  @Column()
  amount: number;
}
