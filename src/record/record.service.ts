import { RecordModel } from './record.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordOptions } from '../constants/password-options';
import { CreateRecordDto } from './dto/create-record.dto';
import * as generator from 'generate-password';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class RecordService {
  constructor(@InjectModel(RecordModel.name) private readonly recordModel: Model<RecordModel>){}

  async createRecord(dto: CreateRecordDto): Promise<RecordModel> {
    const recordModel = new this.recordModel({
      serviceName: dto.serviceName,
      login: dto.login,
      password: this.encryptPassword(this.passwordGenerator())
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
    const encryptedRecords = await this.recordModel.find();
    encryptedRecords.forEach(record => record.password = this.decryptPassword(record.password));
    return encryptedRecords;
  }

  async readRecordById(id: string): Promise<RecordModel> {
    const encryptedRecord = await this.recordModel.findById(id);
    encryptedRecord.password = this.decryptPassword(encryptedRecord.password);
    return encryptedRecord;
  }
  
  async updateRecord(id: string, dto: UpdateRecordDto): Promise<RecordModel> {
    if (dto.password) {
      await this.updateRecordPassword(id);
    }
    return await this.recordModel.findByIdAndUpdate(id, {
      serviceName: dto.serviceName,
      login: dto.login,
    });
  }

  async updateRecordPassword(id: string, dto?: UpdatePasswordDto): Promise<RecordModel> {
    if (dto && dto.password) {
      return await this.recordModel.findByIdAndUpdate(id, {'password': this.encryptPassword(dto.password)});
    } else {
      return await this.recordModel.findByIdAndUpdate(id, {'password': this.encryptPassword(this.passwordGenerator())});
    }
  }

  private passwordGenerator(): string {
    return generator.generate({
    length: PasswordOptions.LENGTH,
    numbers: true,
    symbols: true,
    exclude: PasswordOptions.EXCLUDED_SYMBOLS
    });
  }

  private encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, process.env.ENCRYPTION_KEY).toString();
  }

  private decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}