import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class CouponDto {
  @ApiProperty()
  @Expose()
  id: number;
  @ApiProperty()
  @Expose()
  discount: number;
  @ApiProperty()
  @Expose()
  isUsed: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
