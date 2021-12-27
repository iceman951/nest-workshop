import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { Zone } from "../zones/zones.entity";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("can create an instance of users service", () => {
    expect(service).toBeDefined();
  });
});
