import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "../src/app.controller";
import { AppService } from "../src/app.service";
import { UsersModule } from "./users/users.module";
import { APP_PIPE } from "@nestjs/core";
import { ZonesModule } from "../src/zones/zones.module";
import { CouponModule } from "../src/coupon/coupon.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    ZonesModule,
    CouponModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get("COOKIE_KEY")],
        })
      )
      .forRoutes("*");
  }
}
