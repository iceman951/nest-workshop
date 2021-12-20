import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/register")
  async register(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(
      body.email,
      body.password,
      body.firstName,
      body.lastName
    );
    return user;
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    const user = await this.userService.findById(parseInt(id));
    return user;
  }

  @Get()
  async findByEmail(@Query("email") email: string) {
    const user = await this.userService.findByEmail(email);
    return user;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    const user = await this.userService.deleteUserById(parseInt(id));
    return user;
  }

  @Delete()
  async deleteByEmail(@Query("email") email: string) {
    const user = await this.userService.deleteUserByEmail(email);
    return user;
  }

  //   @Patch()
  //   async updateInfo
}
