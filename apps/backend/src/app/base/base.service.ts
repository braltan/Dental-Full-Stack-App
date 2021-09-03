import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseModel } from './base.model';
import { IBaseService } from './IBase.service';

@Injectable()
export class BaseService<T extends BaseModel> implements IBaseService<T> {
  constructor(private readonly genericModel: Model<T>) { }

  public async save(entity: any): Promise<any> {
   
    let createdModel = new this.genericModel(entity);
    if(entity._id != undefined) {
    createdModel.isNew = false;
    }
    return await createdModel.save();
  }

  public async multiSave(entity: any[]): Promise<any> {
    return await this.genericModel.insertMany(entity);
  }

  public async findAll(): Promise<T[]> {
    return await this.genericModel.find().sort([['_id' , -1]]).exec();
  }

  public async get(id: object): Promise<T> {
    return await this.genericModel.findById(id).exec();
  }

  public async delete(id: string) {
    return await this.genericModel.findByIdAndDelete(id).exec();
  }
  public async deleteAll() {
    return await this.genericModel.deleteMany().exec();
  }

}
