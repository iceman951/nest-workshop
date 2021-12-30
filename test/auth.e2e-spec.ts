import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  let firstName = "1";
  let lastName = "1";

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("handles a register request", () => {
    const email = "1@email.com";
    const password = "12345";
    return request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password, firstName, lastName })
      .expect(201)
      .then((res) => {
        const { id, email, role } = res.body.user;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
        expect(role).toEqual("visitor");
      });
  });

  it("register as a new user then get the currently logged in user", async () => {
    const email = "1@email.com";
    const password = "12345";

    const res = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password, firstName, lastName })
      .expect(201);

    const cookie = res.get("Set-Cookie");

    const { body } = await request(app.getHttpServer())
      .get("/auth/me")
      .set("Cookie", cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });

  it("login user then get the currently logged in user", async () => {
    const email = "1@email.com";
    const password = "12345";

    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email, password, firstName, lastName })
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password })
      .expect(200);

    expect(body.user.email).toEqual(email);
  });
});
