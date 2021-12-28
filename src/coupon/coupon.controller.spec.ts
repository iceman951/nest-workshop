import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "src/users/users.service";
import { CouponController } from "./coupon.controller";
import { Coupon } from "./coupon.entity";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./dtos/create-coupon.dto";

describe("CouponController", () => {
  let controller: CouponController;
  let fakeCouponService: Partial<CouponService>;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    fakeCouponService = {
      create: async (couponDto: CreateCouponDto, visitorId: number) => {
        return Promise.resolve({
          id: 1,
          code: "abcd",
          discount: couponDto.discount,
          isUsed: false,
        } as Coupon);
      },
      updateIsUsedCoupon: (couponId: number, isUsed: boolean) => {
        return Promise.resolve({
          id: couponId,
          code: "acd",
          discount: 10,
          isUsed,
        } as Coupon);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
      providers: [
        { provide: CouponService, useValue: fakeCouponService },
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    controller = module.get<CouponController>(CouponController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("updated isUesd to true, coupon should be isUsed: true", async () => {
    const coupon = await controller.updateIsUsed({ couponId: 1, use: true });
    expect(coupon.isUsed).toEqual(true);
  });

  it("create coupon, coupon should be defined", async () => {
    const coupon = await controller.createCoupon({
      discount: 10,
      visitorId: 1,
    });
    expect(coupon).toBeDefined();
  });
});
