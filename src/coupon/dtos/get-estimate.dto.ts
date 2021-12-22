import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, Max, Min } from "class-validator";

export class GetEstimateDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(100)
  @Min(0)
  discount: number;

  @IsBoolean()
  isUsed: boolean;
}
