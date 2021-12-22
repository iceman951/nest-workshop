import { IsBoolean, IsNumber, Max, Min } from "class-validator";

export class CreateCouponDto {
  @IsNumber()
  @Max(100)
  @Min(0)
  discount: number;

  //   @IsBoolean()
  //   isUsed: boolean;
}
