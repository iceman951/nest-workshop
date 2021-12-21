import { Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./users/users.entity";
import { UsersModule } from "./users/users.module";
import { APP_PIPE } from "@nestjs/core";
import { ZonesModule } from "./zones/zones.module";
import { Zone } from "./zones/zones.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [User, Zone],
      synchronize: true,
    }),
    UsersModule,
    ZonesModule,
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
export class AppModule {}
