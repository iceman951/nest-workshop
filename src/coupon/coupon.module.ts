import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CouponController } from "./coupon.controller";
import { Coupon } from "./coupon.entity";
import { CouponService } from "./coupon.service";

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
