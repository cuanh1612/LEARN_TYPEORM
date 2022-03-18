import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Banker } from "./Banker";
import { TranSaction } from "./Transacttion";
import { Person } from "./utils/Person";

@Entity("client")
export class Client extends Person {
  @Column({
    default: true,
    name: "active",
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true,
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Banker, {
    cascade: false,
  })
  bankers: Banker[];

  @OneToMany(() => TranSaction, (transaction) => transaction.client)
  transactions: TranSaction[];
}
