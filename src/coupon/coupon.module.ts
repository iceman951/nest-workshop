import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { CouponController } from "./coupon.controller";
import { Coupon } from "./coupon.entity";
import { CouponService } from "./coupon.service";

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), UsersModule],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
