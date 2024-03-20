import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  //mongoose.connect('')
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || 5000, 
  () => console.log(`Server started on port ${process.env.APP_PORT}`));
};
bootstrap();