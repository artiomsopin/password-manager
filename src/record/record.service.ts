import { PasswordOptions } from '../constants/password-options';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordModel } from './record.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as generator from 'generate-password';

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

  async readAllRecords(): Promise<RecordModel[]> {
    return await this.recordModel.find();
  }

  async readRecordById(id: string): Promise<RecordModel> {
    return await this.recordModel.findById(id);
  }
  
  async updateRecord(id: string, dto: UpdateRecordDto): Promise<RecordModel> {
    if (dto.password) {
      this.updateRecordPassword(id);
    }

    return await this.recordModel.findByIdAndUpdate(id, {
      serviceName: dto.serviceName,
      login: dto.login,
    });
  };

  async updateRecordPassword(id: string, dto?: UpdatePasswordDto): Promise<RecordModel> {
    try{
    if (dto && dto.password) {
      return await this.recordModel.findByIdAndUpdate(id, {'password': dto.password});
    } else {
      return await this.recordModel.findByIdAndUpdate(id, {'password': this.passwordGenerator()});
    }
    } catch (e) {
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  };

  private passwordGenerator(): string {
    return generator.generate({
    length: PasswordOptions.LENGTH,
    numbers: true,
    symbols: true,
    exclude: PasswordOptions.EXCLUDED_SYMBOLS
    });
  }
}