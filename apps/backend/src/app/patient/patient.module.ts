import { Patient } from '@dental-full-stack-app/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientController } from './controller/patient.controller';
import { PatientSchema } from './schema/patient.schema';
import { PatientService } from './service/patient.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name,collection:'Patient', schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
