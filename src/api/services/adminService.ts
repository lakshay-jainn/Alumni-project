import adminAxiosClient from "../axios/adminAxiosClient"

export async function ApproveAlumni(data:any){

    const response = await adminAxiosClient.post('/admin/action/alumni',data)
    
    return response.data
}
export async function ApproveStudent(data:any){

    const response = await adminAxiosClient.post('/admin/action/student',data)
    
    return response.data
}
