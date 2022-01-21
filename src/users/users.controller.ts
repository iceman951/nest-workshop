import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Logger,
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
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserDto } from "./dtos/user.dto";
import { CreateZoneDto } from "../zones/dtos/create-zone.dto";
import { ExceptionDto } from "../dtos/exception.dto";
import { LogoutUserDto } from "../users/dtos/logout-user.dto";
import { Connection } from "typeorm";

@ApiTags("Auth")
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(CurrentUserInterceptor)
@Controller("auth")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private conn: Connection
  ) {}

  @UseGuards(AuthGuard)
  // @ApiCookieAuth()
  @Get("/me")
  @ApiOkResponse({ type: UserDto, description: "Ok" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  me(@CurrentUser() currentUser: User) {
    const res = this.conn
      .query("SELECT * FROM public.zone ORDER BY id ASC")
      .then((res) => {
        console.log(res);
      });

    this.logger.log("currentUser: " + JSON.stringify(currentUser));
    const user = currentUser;
    this.logger.log("return: " + user);
    return user;
  }

  @Post("/register")
  @ApiCreatedResponse({ type: User, description: "Creates new user" })
  @ApiBadRequestResponse({
    type: ExceptionDto,
    description: "Bad Request, email in use",
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
  @ApiOkResponse({ type: UserDto, description: "Ok" })
  @ApiNotFoundResponse({ type: ExceptionDto, description: "Not Found" })
  @ApiBadRequestResponse({ type: ExceptionDto, description: "Bad Request" })
  async logIn(@Body() body: LoginUserDto, @Session() session: any) {
    const user = await this.authService.logIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/logout")
  @HttpCode(200)
  @ApiOkResponse({ type: LogoutUserDto, description: "Ok" })
  logOut(@Session() session: any) {
    session.userId = null;
    return { message: "Logout Success" };
  }

  @UseGuards(AuthGuard)
  @Get("/my-zones")
  @HttpCode(200)
  @ApiOkResponse({ type: [CreateZoneDto], description: "Ok" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async getMyCheckedInZones(@CurrentUser() currentUser: User) {
    const myZones = await this.usersService.getCheckedInZones(currentUser.id);
    return myZones;
  }

  //optoinal
  @UseGuards(AuthGuard)
  @Get("/my-amount-zones")
  @ApiOkResponse({ type: Number, description: "Ok" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  async getAmountCheckedInZones(@CurrentUser() currentUser: User) {
    const checkedInZones = await this.usersService.countZones(currentUser.id);
    return checkedInZones;
  }

  @UseGuards(StaffGuard)
  @Get("/:id")
  @ApiCookieAuth()
  @ApiOkResponse({ type: UserDto, description: "Ok" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ type: ExceptionDto, description: "Not Found" })
  async findById(@Param("id") id: string) {
    const user = await this.usersService.findById(parseInt(id));
    return user;
  }

  @UseGuards(StaffGuard)
  @Get()
  @ApiOkResponse({ type: Number, description: "Ok" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ type: ExceptionDto, description: "Not Found" })
  async findByEmail(@Query("email") email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  @UseGuards(StaffGuard)
  @Delete("/:id")
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ type: ExceptionDto, description: "Not Found" })
  @ApiOkResponse({ type: UserDto, description: "Ok" })
  async deleteById(@Param("id") id: string) {
    const user = await this.usersService.deleteUserById(parseInt(id));
    return user;
  }

  @UseGuards(StaffGuard)
  @Delete()
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ type: ExceptionDto, description: "Not Found" })
  @ApiOkResponse({ type: UserDto, description: "Ok" })
  async deleteByEmail(@Query("email") email: string) {
    const user = await this.usersService.deleteUserByEmail(email);
    return user;
  }

  @UseGuards(AuthGuard)
  @Patch("/:id")
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ type: ExceptionDto, description: "Not Found" })
  @ApiOkResponse({ type: UserDto, description: "Ok" })
  async update(@Param("id") id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.editUser(parseInt(id), body);
    return user;
  }
}
