import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Zone } from "./zones.entity";

@Injectable()
export class ZonesService {
  constructor(@InjectRepository(Zone) private repo: Repository<Zone>) {}

  create(name: string, detail: string) {
    const zone = this.repo.create({ name, detail });
    return this.repo.save(zone);
  }
}
