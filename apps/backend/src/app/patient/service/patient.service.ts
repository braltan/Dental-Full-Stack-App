import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../base/base.service';
import { PatientDocument } from '../schema/patient.schema';

@Injectable()
export class PatientService extends BaseService<PatientDocument>{
  constructor(
    @InjectModel('Patient') private patientModel: Model<PatientDocument>,
  ) {
    super(patientModel);
  }

}
