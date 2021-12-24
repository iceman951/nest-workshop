import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { StaffGuard } from "src/guards/staff.guard";
import { Serialize } from "src/interceptors/serialize.intercepter";
import { CouponService } from "./coupon.service";
import { CouponDto } from "./dtos/coupon.dto";
import { CreateCouponDto } from "./dtos/create-coupon.dto";
import { UseCouponDto } from "./dtos/use-coupon-dto";

@Controller("coupon")
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Serialize(CouponDto)
  @UseGuards(StaffGuard)
  @Post("/staff")
  createCoupon(@Body() body: CreateCouponDto) {
    return this.couponService.create(body, body.visitorId);
  }
  @UseGuards(AuthGuard)
  @Patch()
  updateIsUsed(@Body() body: UseCouponDto) {
    return this.couponService.updateIsUsedCoupon(body.couponId, body.use);
  }
}
