import adminAxiosClient from "../axios/adminAxiosClient"

export async function Approve(data:any){

    const response = await adminAxiosClient.post('/admin/action',data)
    
    return response.data
}
