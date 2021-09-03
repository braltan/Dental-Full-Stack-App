import { adminUser, User } from '@dental-full-stack-app/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { BaseService } from '../../base/base.service';
import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService extends BaseService<UserDocument>{
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {
    super(userModel);

     //create admin user
     this.findAll().then(res => {
      if (res == undefined || res.length == 0) {
        const user = adminUser;
        this.save(user);
      }
    })
  }
  private async validate(userData: User): Promise<any> {
    return await this.findByUserPass(userData.username, userData.password);
  }

  public async login(user: User): Promise<any | { status: number }> {
    return this.validate(user).then(userData => {
      if (!userData) {
        return { status: 404 };
      }
      let payload : any = {
       user:userData
      };
      payload.expires_in = 3200
      payload.login_date = Date.now();
      payload.status = 200;
      const accessToken = this.jwtService.sign(payload);
      return {
        accessToken,
      };
    });
  }

  public async getUserPayload(
    token: any,
  ): Promise<any | { status: number }> {
    return this.jwtService.verify(token.accessToken);
  }
  public async register(user: User): Promise<any> {
    user.password = crypto
      .createHash('md5')
      .update(user.password)
      .digest('hex');
    return this.save(user);
  }

  public async changePassword(query:any) {
    query.password = crypto
      .createHash('md5')
      .update(query.password)
      .digest('hex');
      return this.userModel.updateOne({_id:query._id},{password:query.password}).exec();
  }

  async findById(id:string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByUserPass(username: string, password: string): Promise<User> {
    return await this.userModel.findOne({
        username : username,
        password: crypto
          .createHash('md5')
          .update(password)
          .digest('hex'),
   
    }).exec();
  }
}
