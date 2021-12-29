import { User } from "../users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Coupon {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: "codenaja" })
  code: string;

  @ApiProperty()
  @Column({ default: 10 })
  discount: number;

  @ApiProperty()
  @Column({ default: false })
  isUsed: boolean;

  @ApiProperty()
  @OneToOne(() => User, (user) => user.coupon, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
