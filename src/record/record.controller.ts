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
  HttpStatus
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordModel } from './record.model';
import { UpdateRecordDto } from './dto/update-record.dto';


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
  async updateRecord(@Param("id") id: string, @Body() updateRecordDto: UpdateRecordDto): Promise<RecordModel> {
    return this.RecordService.updateRecord(id, updateRecordDto);
  }
  
  @Delete("delete/servicename/:serviceName")
  async deleteRecordByServiceName(@Param("serviceName") serviceName: string): Promise<RecordModel | null> {
    return await this.RecordService.deleteRecordByServiceName(serviceName);
  }

  @Delete("delete/:id")
  async deleteRecordById(@Param("id") id: string): Promise<RecordModel> {
    const deletedRecord = await this.RecordService.deleteRecordById(id);
    if (!deletedRecord) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }
    return deletedRecord;
  }
}