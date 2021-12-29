import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Coupon } from "../coupon/coupon.entity";
import { Zone } from "../zones/zones.entity";
import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from "typeorm";
import { User } from "../users/users.entity";
import { UsersService } from "../users/users.service";

describe("UsersService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  const testConnectionName = "testUserConnection";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    let connection = await createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [User, Zone, Coupon],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(User, testConnectionName);
    service = new UsersService(repository);

    return connection;

    // service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    const conn = getConnection(testConnectionName);
    await conn.close();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create user, should be defined user", async () => {
    const user = await service.createUser("1@email.com", "12345", "1", "1");
    expect(user).toBeDefined();
  });

  it("edit user, user should be changed", async () => {
    await service.createUser("1@email.com", "12345", "1", "1");
    const user = await service.editUser(1, { name: "2" } as Partial<User>);
    expect(user).toBeDefined();
  });
});
