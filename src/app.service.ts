import { Inject, Injectable } from "@nestjs/common";
import { PG_CONNECTION } from "./database/constant";

import { Connection, getConnection } from "typeorm";
import { User } from "./users/users.entity";

@Injectable()
export class AppService {
  constructor(
    @Inject(PG_CONNECTION) private connm: any,
    private conn: Connection
  ) {}

  //Test query without entity
  async getAllUsers() {
    // this.conn.query("SELECT * FROM zone ORDER BY id ASC").then((res) => {
    //   console.log(res);
    // });
    getConnection()
      .query("SELECT * FROM user")
      .then((res: User[]) => {
        console.log(res);
      });
    // const res = await this.conn.query(
    //   "SELECT * FROM public.user ORDER BY id ASC"
    // );
    // console.log(res.rows);

    return "res.rows";
  }

  getHello(): string {
    return "Hello World!";
  }
}
