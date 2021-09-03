import { Patient, patientSchema } from '@dental-full-stack-app/models';
import { Document } from 'mongoose';
import classToSchema from '../../base/classToSchema';

export type PatientDocument = Patient & Document;
const schemaConfig = {id:false,toJSON:{virtuals:true},toObject:{virtuals:true}, versionKey: false};
export const PatientSchema = classToSchema(patientSchema,schemaConfig)