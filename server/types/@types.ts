
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

export interface user {
    _id: string,
    email: string,
    username: string,
    register_date: string,
    __v: number,
}


export interface UserRequest extends Request { user: { id: string } }