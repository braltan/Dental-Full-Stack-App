export class User{
    _id:string;
    fullName: string;
    username: string;
    password: string;
    mainPage: string;
    constructor() {
 
    }
 }

 export const userSchema = {
    "fullName" : String,
    "username":{type:String, unique : true},
    "policeStation" :String,
    "password": String,
    "mainPage" : String,
 }

 export const adminUser = {
   "fullName" : "System Admin",
   "username" : "admin",
   "password" : "e10adc3949ba59abbe56e057f20f883e"
}