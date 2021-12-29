import { Exclude } from "class-transformer";
import { Coupon } from "../coupon/coupon.entity";
import { Zone } from "../zones/zones.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "visitor" })
  role: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => Coupon, (coupon) => coupon.user)
  coupon: Coupon;

  @ManyToMany(() => Zone, (zone) => zone.users)
  // @JoinTable()
  zones: Zone[];
}
