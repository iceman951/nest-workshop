import { Expose, Transform } from "class-transformer";

export class CouponDto {
  @Expose()
  id: number;
  @Expose()
  discount: number;
  @Expose()
  isUsed: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
