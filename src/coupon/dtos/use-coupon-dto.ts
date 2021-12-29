import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class UseCouponDto {
  @ApiProperty()
  @IsNumber()
  couponId: number;

  @ApiProperty()
  @IsBoolean()
  use: boolean;
}
