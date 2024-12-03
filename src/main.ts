import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './infrastructure/middlewares/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  //const port = process.development.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('PetlIVRE API')
    .setDescription('Sistema de cadastro para vacinação gratuita de Pets')
    .setVersion('1.0')
    .addTag('tags') // Adiciona tags para agrupar os endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on port ${3000}`);
  app.useGlobalFilters(new AllExceptionsFilter());
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
});
