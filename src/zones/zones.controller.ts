import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { StaffGuard } from "src/guards/staff.guard";
import { Serialize } from "src/interceptors/serialize.intercepter";
import { CheckInZoneDto } from "./dtos/check-in-zone.dto";
import { CreateZoneDto } from "./dtos/create-zone.dto";
import { ZoneDto } from "./dtos/zone.dto";
import { ZonesService } from "./zones.service";

@Controller("zones")
export class ZonesController {
  constructor(private zonesService: ZonesService) {}

  @UseGuards(StaffGuard)
  @Post()
  createZone(@Body() body: CreateZoneDto) {
    const zone = this.zonesService.create(body.name, body.detail);
    return zone;
  }

  @Serialize(ZoneDto)
  @UseGuards(StaffGuard)
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
