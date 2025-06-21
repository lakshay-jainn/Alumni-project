import axiosClient from "../axios/axiosClient";


export async function AddComment(data:any){

    const response = await axiosClient.post('/posts/comment',data)
    
    return response.data
}

export async function LikePost(data : any){

    const response = await axiosClient.post('/posts/like-post',data)

      return response.data;
}
export async function LikeComment(data : any){

    const response = await axiosClient.post('/posts/like-comment',data)

      return response.data;
}

export async function FetchComments(url : any ){
    const response = await axiosClient.get(url)
    return response.data
}
export async function createPost(data : any){
    
    const response = await axiosClient.post('/community/post',data)
    
    return response.data
}



export async function FetchFeeds(url : any){
    const response = await axiosClient.get(url)
    return response.data
}
export async function FetchCommunityFeeds(url : any){
    const response = await axiosClient.get(url)
    return response.data
}
export async function FetchCommunities(){
    const response=await axiosClient.get('/community/communities?forPosting=true')
    return response.data;

}