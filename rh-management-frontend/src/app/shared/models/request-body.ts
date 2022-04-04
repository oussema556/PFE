export interface RequestBody{
  id?:string;
  subject:string;
  body?:string;
  jointFile?:File;
  isValidated:boolean;
}
