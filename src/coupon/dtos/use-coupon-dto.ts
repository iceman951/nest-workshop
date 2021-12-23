import { IsBoolean, IsNumber } from "class-validator";

export class UseCouponDto {
  @IsNumber()
  couponId: number;

  @IsBoolean()
  use: boolean;
}
