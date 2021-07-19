import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transactions } from "./Transactions";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: "id",
    type: "int",
  })
  id?: number;

  @Column({ name: "name" })
  name?: string;

  @Column({ name: "cpf" })
  cpf?: number;

  @Column({ name: "email" })
  email?: string;

  @OneToMany(() => Transactions, (transaction) => transaction.user)
  transactions?: Transactions[];

  constructor(name: string, cpf: number, email: string) {
    super();
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }
}
