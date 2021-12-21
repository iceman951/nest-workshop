import { Body, Controller, Post } from "@nestjs/common";
import { CreateZoneDto } from "./dtos/create-zone.dto";
import { ZonesService } from "./zones.service";

@Controller("zones")
export class ZonesController {
  constructor(private zonesService: ZonesService) {}

  @Post()
  createZone(@Body() body: CreateZoneDto) {
    const user = this.zonesService.create(body.name, body.detail);
    return user;
  }
}
