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
    .addTag("events")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
