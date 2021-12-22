import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Coupon } from "./coupon.entity";
import { CreateCouponDto } from "./dtos/create-coupon.dto";

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private repo: Repository<Coupon>,
    private usersService: UsersService
  ) {}

  async create(couponDto: CreateCouponDto, visitorId: number) {
    const coupon = this.repo.create(couponDto);
    const user = await this.usersService.findById(visitorId);
    coupon.user = user;
    return this.repo.save(coupon);
  }
}
