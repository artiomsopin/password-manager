import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordModel } from './record.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdatePasswordDto } from './dto/update-pasword.dto';

@Injectable()
export class RecordService {
  constructor(@InjectModel(RecordModel.name) private readonly recordModel: Model<RecordModel>){}

  async createRecord(dto: CreateRecordDto): Promise<RecordModel> {
    const recordModel = new this.recordModel({
      serviceName: dto.serviceName,
      login: dto.login,
      password: this.passwordGenerator()
    });
    
    return await this.recordModel.create(recordModel);
  }

  async deleteRecordByServiceName(serviceName: string): Promise<RecordModel> {
    return await this.recordModel.findOneAndDelete({ 'serviceName': serviceName });
  }

  async deleteRecordById(id: string): Promise<RecordModel> {
     return await this.recordModel.findByIdAndDelete(id);
  }

  async readRecords(): Promise<RecordModel[]> {
    return await this.recordModel.find();
  }

  async updateRecord(id: string, dto: UpdateRecordDto): Promise<RecordModel> {
    this.updateRecordPassword(id, { "password": dto.password});
    
    return await this.recordModel.findByIdAndUpdate(id, {
      serviceName: dto.serviceName,
      login: dto.login,
    });
  };

  async updateRecordPassword(id: string, dto: UpdatePasswordDto): Promise<RecordModel> {
    if (dto.password) {
      return await this.recordModel.findByIdAndUpdate(id, {'password': this.passwordGenerator()});
    } else {
      return await this.recordModel.findById(id);
    }
  };

  private passwordGenerator(): string {
    return Math.random().toString(36).slice(2, 10);
  }
} 

