import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, Max, Min } from "class-validator";

export class GetEstimateDto {
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(100)
  @Min(0)
  discount: number;

  @ApiProperty()
  @IsBoolean()
  isUsed: boolean;
}
