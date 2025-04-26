import axiosClient from "../axios/axiosClient";
export async function getPendingRequests(){
    const res = await axiosClient.get('/connection/pending-connections')
    return res.data
}
export async function getFollowersFolling(){
    const res = await axiosClient.get('/connection/connections')
    return res.data
}
