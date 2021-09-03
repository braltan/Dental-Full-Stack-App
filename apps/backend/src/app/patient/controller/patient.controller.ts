import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { PatientDocument } from '../schema/patient.schema';
import { PatientService } from '../service/patient.service';

@Controller('api/patient')
export class PatientController extends BaseController<PatientDocument> {
  constructor(private readonly patientService: PatientService) {
    super(patientService);
  }


}
