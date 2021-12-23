import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "./auth/auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./users.entity";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { UsersService } from "./users.service";

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(CurrentUserInterceptor)
@Controller("auth")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get("/me")
  me(@CurrentUser() currentUser: User) {
    const user = currentUser;
    return user;
  }

  @Post("/register")
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName
    );
    session.userId = user.id;
    return user;
  }

  @Post("/login")
  async logIn(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authService.logIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Post("/logout")
  logout(@Session() session: any) {
    session.userId = null;
  }

  @Get("/zones")
  async getAmountCheckedInZones(@CurrentUser() currentUser: User) {
    const checkedInZones = await this.usersService.countZones(currentUser.id);
    return checkedInZones;
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    const user = await this.usersService.findById(parseInt(id));
    return user;
  }

  @Get()
  async findByEmail(@Query("email") email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    const user = await this.usersService.deleteUserById(parseInt(id));
    return user;
  }

  @Delete()
  async deleteByEmail(@Query("email") email: string) {
    const user = await this.usersService.deleteUserByEmail(email);
    return user;
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.editUser(parseInt(id), body);
    return user;
  }
}
