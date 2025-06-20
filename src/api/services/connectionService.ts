import axiosClient from "../axios/axiosClient";
export async function getPendingRequests(){
    const res = await axiosClient.get('/connection/pending-connections')
    return res.data
}
export async function getFollowersFollowing(){
    const res = await axiosClient.get('/connection/connections')
    return res.data
}
export async function sendConnectionReq(receiverId:string){
    const res  = await axiosClient.post('/connection/send-connection',{receiverId})
    return res.data
}
export async function acceptRejectRequest(Id:string,status:"ACCEPTED"|"REJECTED"){

    const res  = await axiosClient.post('/connection/response-connection',{connectionId:Id,status})
    return res.data
}