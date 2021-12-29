import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CheckInZoneDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  zoneId: number;
}
