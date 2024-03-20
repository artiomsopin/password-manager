import { Inject, Injectable } from '@nestjs/common';
import { RecordModel } from './record.model';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class AppService {

  async createRecord (dto: CreateRecordDto) {
  }
}