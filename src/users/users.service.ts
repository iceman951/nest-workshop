import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const user = this.repo.create({ email, password, firstName, lastName });

    return this.repo.save(user);
  }
}
