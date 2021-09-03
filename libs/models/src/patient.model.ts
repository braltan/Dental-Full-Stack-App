import { Payment } from "./payment.model";

export class Patient{
    _id:string;
    name: string;
    surname: string;
    tcId: string;
    address: string;
    totalFee: number;
    phoneNumber: string;
    paymentList:Payment[];
    constructor() {
 
    }
 }

 export const patientSchema = {
    "name" : String,
    "surname":String,
    "tcId":String,
    "address":String,
    "totalFee": Number,
    "phoneNumber": String,
    "paymentList":[]
 }