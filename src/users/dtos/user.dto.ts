import { Exclude } from "class-transformer";

export class User {
  @Exclude()
  id: number;

  @Exclude()
  email: string;

  @Exclude()
  firstName: string;

  @Exclude()
  lastName: string;
}
