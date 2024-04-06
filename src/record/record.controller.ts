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
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Record")
@Controller("record")
export class RecordController {
  constructor(private readonly RecordService: RecordService) {}

  @ApiOperation( {summary: "Create new record"} )
  @ApiResponse( {status: 201, type: RecordModel})
  @UsePipes(new ValidationPipe())
  @Post("create")
  async createRecord(@Body() createRecordDto: CreateRecordDto) {
    return await this.RecordService.createRecord(createRecordDto);
  }

  @ApiOperation( {summary: "Get all records"} )
  @ApiResponse( {status: 200, type: RecordModel})
  @Get("read/all")
  async readAllRecords(): Promise<RecordModel[]> {
    return await this.RecordService.readAllRecords();
  }

  @ApiOperation( {summary: "Get record by ID"} )
  @ApiResponse( {status: 200, type: RecordModel})
  @Get("read/:id")
  async readRecordsById(@Param("id") id: string): Promise<RecordModel> {
    try {
    return await this.RecordService.readRecordById(id);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation( {summary: "Update full record"} )
  @ApiResponse( {status: 200, type: RecordModel})
  @Put("update/:id")
  async updateRecord(@Param("id") id: string, @Body() updateRecordDto: UpdateRecordDto) {
    try {
      return await this.RecordService.updateRecord(id, updateRecordDto);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation( {summary: "Update record's password"} )
  @ApiResponse( {status: 200, type: RecordModel})
  @Patch("update/password/:id")
  async updatePasswordRecord(@Param("id") id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    try {
    return await this.RecordService.updateRecordPassword(id, updatePasswordDto);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
  
  @ApiOperation( {summary: "Delete record by service name"} )
  @ApiResponse( {status: 200, type: RecordModel})
  @Delete("delete/serviceName/:serviceName")
  async deleteRecordByServiceName(@Param("serviceName") serviceName: string): Promise<RecordModel> {
    try {
      return await this.RecordService.deleteRecordByServiceName(serviceName);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation( {summary: "Delete record by ID"} )
  @ApiResponse( {status: 200, type: RecordModel})
  @Delete("delete/:id")
  async deleteRecordById(@Param("id") id: string): Promise<RecordModel> {
    try {
      return await this.RecordService.deleteRecordById(id);
    } catch (e) {    
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }
}