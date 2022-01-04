import { Exclude } from "class-transformer";
import { Coupon } from "../coupon/coupon.entity";
import { Zone } from "../zones/zones.entity";
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ default: "visitor" })
  role: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty()
  @OneToOne(() => Coupon, (coupon) => coupon.user)
  coupon: Coupon;

  @ApiProperty()
  @ManyToMany(() => Zone, (zone) => zone.users)
  // @JoinTable()
  zones: Zone[];
}
