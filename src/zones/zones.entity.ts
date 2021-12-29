import { User } from "../users/users.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Zone {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  detail: string;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.zones)
  @JoinTable()
  users: User[];
}
