import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./users/users.entity";
import { UsersModule } from "./users/users.module";
import { APP_PIPE } from "@nestjs/core";
import { ZonesModule } from "./zones/zones.module";
import { Zone } from "./zones/zones.entity";
import { CouponModule } from "./coupon/coupon.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Coupon } from "./coupon/coupon.entity";
const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
          synchronize: true,
          entities: [User, Zone, Coupon],
          keepConnectionAlive: true,
        };
      },
    }),
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
