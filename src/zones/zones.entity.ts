import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  detail: string;
}
