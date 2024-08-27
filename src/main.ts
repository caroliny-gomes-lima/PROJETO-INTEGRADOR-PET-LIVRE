import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
});
