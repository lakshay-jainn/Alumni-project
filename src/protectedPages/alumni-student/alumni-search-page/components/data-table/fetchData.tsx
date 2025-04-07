import { Payment } from "./columns.tsx"
import axiosClient from "@/api/axios/axiosClient.ts";


export async function getData( ): Promise<Payment[]> {

  const BACKEND_URL = "/alumni";
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

 
