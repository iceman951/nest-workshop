import { Controller, Get } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'return "Hello World!"' })
  @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/env")
  getEnvironments() {
    return process.env;
  }
}
