import { Body, Controller, Get, Post } from "@nestjs/common";
import { CheckInZoneDto } from "./dtos/check-in-zone.dto";
import { CreateZoneDto } from "./dtos/create-zone.dto";
import { ZonesService } from "./zones.service";

@Controller("zones")
export class ZonesController {
  constructor(private zonesService: ZonesService) {}

  @Post()
  createZone(@Body() body: CreateZoneDto) {
    const zone = this.zonesService.create(body.name, body.detail);
    return zone;
  }

  @Post("/check-in")
  checkIn(@Body() body: CheckInZoneDto) {
    const zone = this.zonesService.checkInZone(body.userId, body.zoneId);
    return zone;
  }

  @Get()
  getZones() {
    const zones = this.zonesService.getAllZones();
    return zones;
  }
}
