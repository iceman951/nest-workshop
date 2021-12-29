import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateCouponDto {
  @ApiProperty()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount: number;

  @ApiProperty()
  @IsNumber()
  visitorId: number;

  //   @IsBoolean()
  //   isUsed: boolean;
}
