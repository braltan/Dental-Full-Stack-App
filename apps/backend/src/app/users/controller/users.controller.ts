import { User } from '@dental-full-stack-app/models';
import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { BaseController } from '../../base/base.controller';
import { UserDocument } from '../schema/user.schema';
import { UsersService } from '../service/users.service';

@Controller('api/users')
export class UsersController extends BaseController<UserDocument> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
  @Post('register')
  async register(@Body() entity: User): Promise<number> {
    return this.usersService.register(entity);
  }
  @Post('changePassword')
  async regichangePasswordster(@Body() query: any): Promise<any> {
    return this.usersService.changePassword(query);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User): Promise<any> {
    return this.usersService.login(user);
  }
  
  @Post('userPayload')
  async userPayload(@Body() token: any): Promise<any> {
    return this.usersService.getUserPayload(token);
  }

}
