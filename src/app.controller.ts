import { Controller, Get, Post, Put, Delete, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("get")
  async getRecord() {
    return this.appService.getHello();
  }

  @Post("create")
  async createRecord() {
    return "post";
  }

  @Put("modify")
  async modifyRecord() {
    return "put";
  }
  
  @Delete("delete")
  async deleteRecord() {
    return "delete";
  }
}