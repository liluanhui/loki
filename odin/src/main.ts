import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { AllExceptionsFilter } from "./filter/all-exception.filter";
import { HttpExceptionsFilter } from "./filter/http-exception.filter";
import { SuccessResponse } from "./interceptor/successResponse";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [],
  });

  app.useGlobalInterceptors(new SuccessResponse());

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  // const env = process.env.NODE_ENV;
  const port = 3001;

  await app.listen(port);
}
bootstrap();
