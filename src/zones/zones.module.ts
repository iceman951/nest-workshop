import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { ZonesController } from "./zones.controller";
import { Zone } from "./zones.entity";
import { ZonesService } from "./zones.service";

@Module({
  imports: [TypeOrmModule.forFeature([Zone]), UsersModule],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule {}
