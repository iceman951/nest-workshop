import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { StaffGuard } from "../guards/staff.guard";
import { Serialize } from "../interceptors/serialize.intercepter";
import { Coupon } from "./coupon.entity";
import { CouponService } from "./coupon.service";
import { CouponDto } from "./dtos/coupon.dto";
import { CreateCouponDto } from "./dtos/create-coupon.dto";
import { UseCouponDto } from "./dtos/use-coupon-dto";

@ApiTags("Coupon")
@Controller("coupon")
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Serialize(CouponDto)
  @UseGuards(StaffGuard)
  @Post("/staff")
  @ApiResponse({
    status: 201,
    type: CouponDto,
    description: "create coupon",
  })
  createCoupon(@Body() body: CreateCouponDto) {
    return this.couponService.create(body, body.visitorId);
  }

  @UseGuards(AuthGuard)
  @Patch()
  @ApiResponse({
    status: 204,
    type: Coupon,
    description: "change isUsed coupon",
  })
  updateIsUsed(@Body() body: UseCouponDto) {
    return this.couponService.updateIsUsedCoupon(body.couponId, body.use);
  }
}
