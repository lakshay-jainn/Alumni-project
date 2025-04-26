import adminAxiosClient from "../axios/adminAxiosClient"

export async function Approve(data:any){

    const response = await adminAxiosClient.post('/admin/action',data)
    
    return response.data
}
export async function CreateCommunity(name:any,description:any){
    const response = await adminAxiosClient.post("/admin/create-community",{name,description})
    return response.data
}