import { Module } from "@nestjs/common";
import { Pool } from "pg";
import { PG_CONNECTION } from "./constant";

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
