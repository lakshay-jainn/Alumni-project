export interface AlumniRequest {
    enrollmentNumber: string,
    status: string,
    userId : string,
    email:string,
    profileImage:string,
    basic:{
        lastName:string,
        firstName:string,
    },
    batch:string | null,
    user:{
        id:string,
        username:string,
        role: string,
        profileImage:string,
    }
}
