import { Controller, Get } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { MyLogger } from "./logger/mylogger.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly myLogger: MyLogger
  ) {}

  @Get()
  @ApiOkResponse({ description: 'return "Hello World!"' })
  @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
  async getHello(): Promise<string> {
    // this.myLogger.log("This Logging is log");
    // this.myLogger.error("This Logging is error", "message for errors");
    // this.myLogger.warn("This Logging is warning");
    // this.myLogger.debug("This Logging is debug");
    // this.myLogger.verbose("This Logging is verbose");
    this.myLogger.audit("sdsdfsd");

    const queryData = await this.appService.getAllUsers();

    return this.appService.getHello();
  }

  @Get("/env")
  getEnvironments() {
    return process.env;
  }
}
