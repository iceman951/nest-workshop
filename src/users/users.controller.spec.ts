import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth/auth.service";
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findById: (id: number) => {
        return Promise.resolve({
          id,
          email: "1@email.com",
          password: "12345",
        } as User);
      },
      findByEmail: (email: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password: "12345",
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "12345" } as User]);
      },
    };

    fakeAuthService = {
      // signup: () => {},
      logIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      register: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
      ) => {
        return Promise.resolve({
          email,
          password,
          firstName,
          lastName,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findUser returns a single user with the given id", async () => {
    const user = await controller.findById("1");
    expect(user).toBeDefined();
  });

  it("findAllUsers returns a list of users with the given email", async () => {
    const user = await controller.findByEmail("1@email.com");
    expect(user).toBeDefined();
  });

  it("signin updates session object and returns user", async () => {
    const session = { userId: -10 };
    const user = await controller.logIn(
      { email: "2@email.com", password: "12345" },
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it("signup returns a single user", async () => {
    const session = { userId: -10 };
    const user = await controller.register(
      {
        email: "1@email.com",
        password: "12345",
        firstName: "1",
        lastName: "1",
      },
      session
    );
    expect(user.email).toEqual("1@email.com");
    expect(user.firstName).toEqual("1");
    expect(user.lastName).toEqual("1");
  });

  it("session.userId shoud be null when logout", async () => {
    const session = { userId: -10 };
    controller.logOut(session);
    expect(session.userId).toBeNull();
  });
});
