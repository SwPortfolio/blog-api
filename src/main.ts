import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      transformOptions: { enableImplicitConversion: true }, // 암묵적으로 타입을 변환 시켜줌
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
