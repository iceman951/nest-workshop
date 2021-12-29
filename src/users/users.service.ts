import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";

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

  async findByEmail(email: string) {
    const user = await this.repo.findOne({ email });
    if (!user) {
      throw new NotFoundException(`userEmail: ${email} not found`);
    }
    return user;
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new NotFoundException(`userId: ${id} not found`);
    }
    return user;
  }

  async deleteUserById(id: number) {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new NotFoundException(`userId: ${id} not found`);
    }
    return this.repo.remove(user);
  }

  async deleteUserByEmail(email: string) {
    const user = await this.repo.findOne({ email });
    if (!user) {
      throw new NotFoundException(`userEmail: ${email} not found`);
    }
    return this.repo.remove(user);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async editUser(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException(`userId: ${id} not found`);
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async countZones(userId: number) {
    const user = await this.repo.findOne(userId, { relations: ["zones"] });
    const checkedInZones = user.zones.length;
    return checkedInZones;
  }

  async getCheckedInZones(userId: number) {
    const user = await this.repo.findOne(userId, { relations: ["zones"] });
    return user.zones;
  }
}
