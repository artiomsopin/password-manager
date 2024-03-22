import { Inject, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordModel } from './record.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { UpdateRecordDto } from './dto/update-record.dto';



@Injectable()
export class RecordService {
  constructor(@InjectModel(RecordModel.name) private recordModel: Model<RecordModel>){}

  async createRecord(dto: CreateRecordDto): Promise<RecordModel> {
    const recordModel = new this.recordModel({
      serviceName: dto.serviceName,
      login: dto.login,
      password: this.passwordGenerator()
    });
    return await this.recordModel.create(recordModel);
  }

  async deleteRecordByServiceName(serviceName: string): Promise<RecordModel | null> {
    return await this.recordModel.findOneAndDelete({ 'serviceName': serviceName });
  }

  async deleteRecordById(id: string): Promise<RecordModel | null> {
     return await this.recordModel.findByIdAndDelete(id);
  }

  async readRecords(): Promise<RecordModel[]> {
    return await this.recordModel.find();
  }

  async updateRecord(id: string, dto: UpdateRecordDto): Promise<RecordModel> {
    return await this.recordModel.findByIdAndUpdate(id, {
      serviceName: dto.serviceName,
      login: dto.login,
      password: this.passwordGenerator()
    });

  }
  private passwordGenerator(): string {
    return Math.random().toString(36).slice(2, 10);
  }
} 

