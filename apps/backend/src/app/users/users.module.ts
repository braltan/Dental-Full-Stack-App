import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './service/local.strategy';
import { JwtStrategy } from './service/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { User } from '@dental-full-stack-app/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name,collection:'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret12356789',
    }),
    PassportModule
  ],
  controllers: [UsersController],
  providers: [UsersService,LocalStrategy,JwtStrategy],
})
export class UsersModule {}
