import { User } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discount: number;

  @Column({ default: false })
  isUsed: boolean;

  @OneToOne(() => User, (user) => user.coupon)
  @JoinColumn()
  user: User;
}
