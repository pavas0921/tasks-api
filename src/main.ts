import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Solo permite las propiedades definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si envías propiedades extra
      transform: true, // Transforma payloads a sus tipos declarados
    }),
  );

  await app.listen(3000);
}
bootstrap();
