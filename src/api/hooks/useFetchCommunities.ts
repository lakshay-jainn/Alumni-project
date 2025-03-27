
import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import {InitialCommunitiesResponse } from "@/api/types/FeedsTypes"
import { handleApiError } from "../utils/apiUtils";
export default function useFetchCommunities() {
    const [communities,setCommunities] = useState<Partial<InitialCommunitiesResponse> | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchCommunities = async() =>{
            try{
                const response=await axiosClient.get('/community/communities')
               
                const data=response.data;

                setCommunities(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchCommunities();
        
    },[])



    return [communities,loading,error];
}