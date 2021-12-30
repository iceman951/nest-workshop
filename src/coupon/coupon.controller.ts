import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/users.entity";
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

  @Get("/me")
  @ApiResponse({
    status: 200,
    type: Coupon,
    description: "get my coupon",
  })
  async getMyCoupon(@CurrentUser() currentUser: User) {
    const coupon = await this.couponService.getCouponByUserId(currentUser.id);
    return coupon;
  }
}
