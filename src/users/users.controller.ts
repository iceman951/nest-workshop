import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { AuthService } from "./auth/auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./users.entity";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { UsersService } from "./users.service";
import { StaffGuard } from "../guards/staff.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dtos/user.dto";
import { CreateZoneDto } from "../zones/dtos/create-zone.dto";

@ApiTags("Auth")
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(CurrentUserInterceptor)
@Controller("auth")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(AuthGuard)
  @Get("/me")
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: "my information",
  })
  me(@CurrentUser() currentUser: User) {
    const user = currentUser;
    return user;
  }

  @Post("/register")
  @ApiResponse({
    status: 201,
    type: User,
    description: "Creates new user",
  })
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName
    );
    session.userId = user.id;
    return { success: true, message: "Register Success", user: user };
  }

  @Post("/login")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: "Login",
  })
  async logIn(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authService.logIn(body.email, body.password);
    session.userId = user.id;
    return {
      success: true,
      message: "Login Success",
      user: user,
    };
  }

  @Post("/logout")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Logout, clear session",
  })
  logOut(@Session() session: any) {
    session.userId = null;
    return { success: true, message: "Logout Success" };
  }

  @UseGuards(AuthGuard)
  @Get("/my-zones")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [CreateZoneDto],
    description: "get all my check-in zones",
  })
  async getMyCheckedInZones(@CurrentUser() currentUser: User) {
    const myZones = await this.usersService.getCheckedInZones(currentUser.id);
    return myZones;
  }

  //optoinal
  @UseGuards(AuthGuard)
  @Get("/my-amount-zones")
  @ApiResponse({
    status: 200,
    type: Number,
    description: "amount my check-in zones",
  })
  async getAmountCheckedInZones(@CurrentUser() currentUser: User) {
    const checkedInZones = await this.usersService.countZones(currentUser.id);
    return checkedInZones;
  }

  @UseGuards(StaffGuard)
  @Get("/:id")
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: "get user by id",
  })
  async findById(@Param("id") id: string) {
    const user = await this.usersService.findById(parseInt(id));
    return user;
  }

  @UseGuards(StaffGuard)
  @Get()
  @ApiResponse({
    status: 200,
    type: Number,
    description: "get user by email",
  })
  async findByEmail(@Query("email") email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  @UseGuards(StaffGuard)
  @Delete("/:id")
  @ApiResponse({
    status: 200,
    type: User,
    description: "delete user by id",
  })
  async deleteById(@Param("id") id: string) {
    const user = await this.usersService.deleteUserById(parseInt(id));
    return user;
  }

  @UseGuards(StaffGuard)
  @Delete()
  @ApiResponse({
    status: 200,
    type: User,
    description: "delete user by email",
  })
  async deleteByEmail(@Query("email") email: string) {
    const user = await this.usersService.deleteUserByEmail(email);
    return user;
  }

  @UseGuards(AuthGuard)
  @Patch("/:id")
  @ApiResponse({
    status: 204,
    type: User,
    description: "patch user by id",
  })
  async update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.editUser(parseInt(id), body);
    return user;
  }
}
