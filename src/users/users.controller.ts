import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post("/register")
  register(@Body() body: any) {
    this.userService.createUser(
      body.email,
      body.password,
      body.firstName,
      body.lastName
    );
  }
}
