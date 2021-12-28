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

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with a salted and hashed password", async () => {
    const user = await service.register("10@email.com", "12345", "1", "1");

    expect(user.password).not.toEqual("12345");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user register with email that is in use", async () => {
    await service.register("1@email.com", "12345", "1", "1");
    try {
      await service.register("1@email.com", "12345", "1", "1");
    } catch (error) {
      expect(error.message).toEqual("email in use");
    }
  });

  it("throw error message userEmail: ${email} not found if not found email", async () => {
    const email = "1@email.com";
    try {
      await service.logIn(email, "12345");
    } catch (error) {
      expect(error.message).toEqual(`userEmail: ${email} not found`);
    }
  });

  it("return user if login success", async () => {
    await service.register("1@email.com", "12345", "1", "1");
    const user = await service.logIn("1@email.com", "12345");
    expect(user).toBeDefined();
  });

  it("throw error message if wrong password", async () => {
    await service.register("1@email.com", "12345", "1", "1");
    try {
      await service.logIn("1@email.com", "12345");
    } catch (error) {
      expect(error.message).toEqual(`wrong password`);
    }
  });
});
