import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export interface UserProps {
  firstName: string;
  lastName: string;
  matchName: string;
  email: string;
  description?: string;
  img?: string;
  status?: boolean;
  password: string;
  salt?: string;
}

@Entity()
export class User implements UserProps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  matchName: string;

  @Column({ unique: true })
  password: string;

  @Column({ unique: true })
  salt: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  img?: string;

  @Column({ default: true })
  status?: boolean;
}
