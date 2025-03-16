export interface AuthResponse{
    id?:string;
    success:boolean;
    message: string;
    fullName?:string;
    token?:string;
    email?:string;
    roles?:string[];
}
export interface SignupRequest{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phoneNumber:string;
    confirmPassword?:string;
    terms?:boolean;
}
export interface LoginRequest{
    email:string;
    password:string;
    rememberMe?:boolean;
}
export interface UserInfo{
    firstName: string;
    lastName:string;
    email:string;
    phoneNumber:string;
    role?:string;
}
export interface AppUsers{
    id?:string;
    name?:string;
    firstName?:string;
    lastName?:string;
    role?:string;
    email?:string;
    phoneNumber?:string;
}

export interface ResponseDto{
    success?:boolean;
    statusCode:number;
    data?:object;
    message:string;
}

