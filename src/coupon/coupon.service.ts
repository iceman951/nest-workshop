import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";
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

    const amountZones = await this.usersService.countZones(visitorId);
    if (amountZones < 3)
      throw new BadRequestException("must check-in more than 2 zones");

    const coupons = await this.repo.find({
      relations: ["user"],
      where: {
        user: {
          id: visitorId,
        },
      },
    });

    if (coupons.length)
      throw new BadRequestException("visitor already have coupon");

    coupon.user = user;
    return this.repo.save(coupon);
  }

  async updateIsUsedCoupon(couponId: number, use: boolean) {
    const coupon = await this.repo.findOne(couponId);
    if (!coupon) {
      throw new NotFoundException("coupon not found");
    }
    coupon.isUsed = use;
    return this.repo.save(coupon);
  }

  async getCouponByUserId(userId: number) {
    const coupon = await this.repo.findOne({
      relations: ["user"],
      where: { id: userId },
    });

    if (!coupon) {
      throw new NotFoundException("not found coupon");
    }

    const newCoupon = {
      id: coupon.id,
      code: coupon.code,
      discount: coupon.discount,
      isUsed: coupon.isUsed,
      userId: coupon.user.id,
    };

    return newCoupon;
  }
}
