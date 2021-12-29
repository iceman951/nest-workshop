import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";
import { In, Repository } from "typeorm";
import { Zone } from "./zones.entity";

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone) private repo: Repository<Zone>,
    private usersService: UsersService
  ) {}

  create(name: string, detail: string) {
    const zone = this.repo.create({ name, detail });
    return this.repo.save(zone);
  }

  async checkInZone(userId: number, zoneId: number) {
    const user = await this.usersService.findById(userId);
    const zone = await this.repo.findOne(zoneId, { relations: ["users"] });
    if (!zone) {
      throw new NotFoundException(`zoneId: ${zoneId} not found`);
    }

    if (zone.users.length) {
      zone.users.push(user);
    } else zone.users = [user];
    return this.repo.save(zone);
  }

  getAllZones() {
    const zones = this.repo.find();
    return zones;
  }
}
