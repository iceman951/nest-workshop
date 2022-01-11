import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as any).set("etag", false);
  app.use((req, res, next) => {
    res.removeHeader("x-powered-by");
    res.removeHeader("date");
    next();
  });

  const config = new DocumentBuilder()
    .setTitle("Event example")
    .setDescription("The events API description")
    .setVersion("1.0")
    .addCookieAuth("optional-session-id")
    // .addTag("events")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentation", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
