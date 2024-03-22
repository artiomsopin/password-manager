import { Module } from '@nestjs/common';
import { RecordController } from './record/record.controller';
import { RecordService } from './record/record.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordModel, RecordSchema } from './record/record.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: RecordModel.name, schema: RecordSchema }])
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class AppModule {}