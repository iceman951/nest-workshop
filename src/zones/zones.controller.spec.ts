import { Test, TestingModule } from "@nestjs/testing";
import { ZonesController } from "./zones.controller";
import { Zone } from "./zones.entity";
import { ZonesService } from "./zones.service";

describe("ZonesController", () => {
  let controller: ZonesController;
  let fakeZonesService: Partial<ZonesService>;

  beforeEach(async () => {
    const zones: Zone[] = [];
    fakeZonesService = {
      getAllZones: () => {
        return Promise.resolve([
          { name: "nabu", detail: "star war planet" } as Zone,
        ]);
      },
      create: (name: string, detail: string) => {
        return Promise.resolve({ id: 1, name, detail } as Zone);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonesController],
      providers: [
        {
          provide: ZonesService,
          useValue: fakeZonesService,
        },
      ],
    }).compile();

    controller = module.get<ZonesController>(ZonesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("zones should be defined when get zones", async () => {
    const zones = await controller.getZones();
    expect(zones).toBeDefined();
  });

  it("return zone when create zone", async () => {
    const zone = await controller.createZone({
      id: 1,
      name: "nabu",
      detail: "star watr planet",
    } as Zone);
    expect(zone.name).toEqual("nabu");
    expect(zone.detail).toEqual("star watr planet");
  });
});
