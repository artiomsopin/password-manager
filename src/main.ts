import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
  .setTitle('Password Manager')
  .setDescription('The password manager API description')
  .setVersion("1.0")
  .addTag('Password Manager endpoints')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.APP_PORT || 8080, 
  () => console.log(`Server started on port ${process.env.APP_PORT || 8080}`));
};

void bootstrap();