import { Expose, Transform } from "class-transformer";

export class ZoneDto {
  @Expose()
  name: string;

  @Expose()
  detail: string;

  @Transform(({ obj }) => obj.users[obj.users.length - 1]["id"])
  @Expose()
  checkedInUserId: number;
}
