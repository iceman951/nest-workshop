import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "../users.entity";
import { UsersService } from "../users.service";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
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

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it("creates a new user with a salted and hashed password", async () => {
    const user = await service.register("10@email.com", "12345", "1", "1");

    expect(user.password).not.toEqual("12345");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined();
  });

  // it("throws an error if user signs up with email that is in use", async (done) => {
  //   await service.register("1@email.com", "12345", "1", "1");
  //   try {
  //     await service.register("1@email.com", "12345", "1", "1");
  //   } catch (err) {
  //     done();
  //   }
  // });
});
