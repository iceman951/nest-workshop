import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Coupon } from "./coupon.entity";
import { CreateCouponDto } from "./dtos/create-coupon.dto";

@Injectable()
export class CouponService {
  constructor(@InjectRepository(Coupon) private repo: Repository<Coupon>) {}

  create(couponDto: CreateCouponDto, user: User) {
    const coupon = this.repo.create(couponDto);
    coupon.user = user;
    console.log(coupon);

    return this.repo.save(coupon);
    // return null;
  }
}
