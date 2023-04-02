import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface ProductProps {
  name: string;
  price: number;
  description?: string;
  img?: string;
}

@Entity()
export class Product {
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
}
