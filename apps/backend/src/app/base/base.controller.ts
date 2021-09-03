import { Body, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseModel } from './base.model';
import { IBaseService } from './IBase.service';

export class BaseController<T extends BaseModel> {
  constructor(private readonly IBaseService: IBaseService<T>) {}
 // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<T[]> {
    return this.IBaseService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id: object): Promise<T> {
    return this.IBaseService.get(id);
  }

  @Post()
  async save(@Body() entity: T): Promise<any> {
    return this.IBaseService.save(entity);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('saveWithoutId')
  async saveWithoutId(@Body() entity: T): Promise<any> {
    delete entity._id;
    return this.IBaseService.save(entity);
    }
  @UseGuards(AuthGuard('jwt'))
  @Post('/multiSave')
  async insertMany(@Body() entity: T[]): Promise<any[]> {
  return this.IBaseService.multiSave(entity);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.IBaseService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteAll() {
    this.IBaseService.deleteAll();
  }
}
