import { 
  Controller,
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  UsePipes, 
  ValidationPipe, 
  Param,
  HttpException,
  HttpStatus,
  Patch
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordModel } from './record.model';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdatePasswordDto } from './dto/update-pasword.dto';


@Controller("record")
export class RecordController {
  constructor(private readonly RecordService: RecordService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async createRecord(@Body() createRecordDto: CreateRecordDto) {
    return await this.RecordService.createRecord(createRecordDto);
  }

  @Get("read")
  async readRecords(): Promise<RecordModel[]> {
    return this.RecordService.readRecords();
  }

  @Put("update/:id")
  async updateRecord(@Param("id") id: string, @Body() updateRecordDto: UpdateRecordDto) {
    try {
    return await this.RecordService.updateRecord(id, updateRecordDto);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @Patch("update/password/:id")
  async updatePasswordRecord(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    try {
    return await this.RecordService.updateRecordPassword(id, updatePasswordDto);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
  
  @Delete("delete/servicename/:serviceName")
  async deleteRecordByServiceName(@Param("serviceName") serviceName: string): Promise<RecordModel | null> {
    return await this.RecordService.deleteRecordByServiceName(serviceName);
  }

  @Delete("delete/:id")
  async deleteRecordById(@Param("id") id: string): Promise<RecordModel> {
    try {
      return await this.RecordService.deleteRecordById(id);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}