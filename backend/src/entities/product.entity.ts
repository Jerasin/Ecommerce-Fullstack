import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Base, BaseInterface } from "./base.entity";
import { WareHouse } from "./warehouse.entity";

export interface ProductProps extends BaseInterface {
  name: string;
  price: number;
  description?: string;
  img?: string;
  weightPriority?: number;
}

@Entity()
export class Product extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  img?: string;

  @Column({ nullable: true, unique: true })
  weightPriority?: number;
}
