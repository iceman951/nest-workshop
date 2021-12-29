import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateZoneDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  detail: string;
}
