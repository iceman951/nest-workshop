import { User } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "codenaja" })
  code: string;

  @Column({ default: 10 })
  discount: number;

  @Column({ default: false })
  isUsed: boolean;

  @OneToOne(() => User, (user) => user.coupon, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
