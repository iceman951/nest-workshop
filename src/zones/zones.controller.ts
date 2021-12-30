import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags, PartialType } from "@nestjs/swagger";
import { StaffGuard } from "../guards/staff.guard";
import { Serialize } from "../interceptors/serialize.intercepter";
import { CheckInZoneDto } from "./dtos/check-in-zone.dto";
import { CreateZoneDto } from "./dtos/create-zone.dto";
import { ZoneDto } from "./dtos/zone.dto";
import { Zone } from "./zones.entity";
import { ZonesService } from "./zones.service";

@ApiTags("Zones")
@Controller("zones")
export class ZonesController {
  constructor(private zonesService: ZonesService) {}

  @UseGuards(StaffGuard)
  @Post()
  @ApiResponse({
    status: 201,
    type: CreateZoneDto,
    description: "create zone",
  })
  createZone(@Body() body: CreateZoneDto) {
    const zone = this.zonesService.create(body.name, body.detail);
    return zone;
  }

  @Serialize(ZoneDto)
  @UseGuards(StaffGuard)
  @Post("/check-in")
  @ApiResponse({
    status: 201,
    type: ZoneDto,
    description: "check-in user with zoneId",
  })
  checkIn(@Body() body: CheckInZoneDto) {
    const zone = this.zonesService.checkInZone(body.userId, body.zoneId);
    return zone;
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [CreateZoneDto],
    description: "get all zones",
  })
  getZones() {
    const zones = this.zonesService.getAllZones();
    return zones;
  }
}
