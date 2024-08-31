import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './infrastructure/middlewares/exception.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
  app.useGlobalFilters(new AllExceptionsFilter());
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
});
