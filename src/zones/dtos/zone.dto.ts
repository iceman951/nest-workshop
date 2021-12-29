import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class ZoneDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  detail: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.users[obj.users.length - 1]["id"])
  @Expose()
  checkedInUserId: number;
}
