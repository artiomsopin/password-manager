import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordModel } from './record.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(RecordModel.name) private recordModel: Model<RecordModel>){}

  async createRecord (dto: CreateRecordDto) {
    const createdRecord = new this.recordModel(dto);
    return createdRecord.save();
  }
} 

