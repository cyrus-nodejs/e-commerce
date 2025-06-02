
export interface IFile  {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    size: number;
    path:string;
    filename:string;
}


// types/User.ts
export interface User {
  _id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  googleId: string;
  displayName: string;
  photo: string;
  role: 'customer' | 'reseller' | 'customer service' | 'admin' | 'super admin';
  token: string;
  register_date: Date;
}
 
  


   



