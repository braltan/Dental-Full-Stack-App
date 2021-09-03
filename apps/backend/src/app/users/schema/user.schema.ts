import { User, userSchema } from '@dental-full-stack-app/models';
import { Document } from 'mongoose';
import classToSchema from '../../base/classToSchema';

export type UserDocument = User & Document;
const schemaConfig = {id:false,toJSON:{virtuals:true},toObject:{virtuals:true}, versionKey: false};
export const UserSchema = classToSchema(userSchema,schemaConfig)