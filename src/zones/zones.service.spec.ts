import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../users/users.entity";
import { UsersService } from "../users/users.service";
import { ZonesService } from "./zones.service";

describe("ZonesService", () => {
  let service: ZonesService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      findById: (id: number) => {
        const filteredUsers = users.filter((user) => user.id === id);
        return Promise.resolve(filteredUsers[0]);
      },
      createUser: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
      ) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
          firstName,
          lastName,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZonesService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<ZonesService>(ZonesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // it("return zone instance when create zone", async () => {
  //   const zone = await service.create("nabu", "star war planet");
  //   expect(zone).toBeDefined();
  // });
});
