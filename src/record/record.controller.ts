import { 
  Controller,
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { AppService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';


@Controller("record")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async createRecord(@Body() createRecordDto: CreateRecordDto) {
    return this.appService.createRecord(createRecordDto);
  }

  @Get("read")
  async readRecord() {
    return ;
  }

  @Put("update")
  async updateRecord() {
    return;
  }
  
  @Delete("delete")
  async deleteRecord() {
    
  }
}