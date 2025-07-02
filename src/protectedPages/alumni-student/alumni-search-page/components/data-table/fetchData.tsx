
import axiosClient from "@/api/axios/axiosClient.ts";


export async function getData(skip: number = 0 , take: number = 30) {

  const BACKEND_URL = `/alumni?skip=${skip}&take=${take}`;
    try {
      const res= await axiosClient.get(BACKEND_URL);
      const data=res.data
    
      if (res.status===200){
        return data


    
    } }catch (e) {
      throw new Error(". Please try again")
    }
    return Promise.reject('Data not found')
}

 
export async function getSearchData(searchQuery : string,skip: number = 0,take :number = 30) {

  const BACKEND_URL = `/alumni/search?searchQuery=${encodeURIComponent(searchQuery)}&skip=${skip}&take=${take}`;
    try {
      const res= await axiosClient.get(BACKEND_URL);
      const data=res.data
    
      if (res.status===200){
        return data


    
    } }catch (e) {
      throw new Error(". Please try again")
    }
    return Promise.reject('Data not found')
}
