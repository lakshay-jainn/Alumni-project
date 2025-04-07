
import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { profileDetailsResponse } from "../types/profileDetailsTypes";
import { handleApiError } from "../utils/apiUtils";
export default function useFetchAlumniProfile(id:(string | undefined)) {
    const [aluminus,setAluminus] = useState<profileDetailsResponse | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchAluminus = async() =>{
            try{
                const response=await axiosClient.get(`/alumni/${id}`)
               
                const data=response.data;

                setAluminus(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchAluminus();
        
    },[])



    return {aluminus,loading,error}
}