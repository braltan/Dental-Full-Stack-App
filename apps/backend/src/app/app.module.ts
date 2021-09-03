import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationMiddleware } from './app.middleware';
import { PatientModule } from './patient/patient.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/DentalApp',{useCreateIndex:true}),
  UsersModule,PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ApplicationMiddleware)
    .forRoutes({path:'*', method: RequestMethod.GET });
 }
}
