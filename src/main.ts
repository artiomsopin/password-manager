import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.setGlobalPrefix("v1/api");
  await app.listen(process.env.APP_PORT || 5000, 
  () => console.log(`Server started on port ${process.env.APP_PORT}`));
};

void bootstrap();