import { IsNumber } from "class-validator";

export class CheckInZoneDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  zoneId: number;
}
