import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  // @ApiProperty()
  password: string;

  @IsString()
  // @ApiProperty()
  firstName: string;

  // @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  lastName: string;
}
