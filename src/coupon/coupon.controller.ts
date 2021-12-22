import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { Serialize } from "src/interceptors/serialize.intercepter";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/users.entity";
import { CouponService } from "./coupon.service";
import { CouponDto } from "./dtos/coupon.dto";
import { CreateCouponDto } from "./dtos/create-coupon.dto";

@Controller("coupon")
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Serialize(CouponDto)
  @Post()
  createCoupon(@Body() body: CreateCouponDto) {
    return this.couponService.create(body, body.visitorId);
  }
}
