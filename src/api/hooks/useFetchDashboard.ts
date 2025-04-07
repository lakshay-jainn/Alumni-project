
import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { DashboardResponse } from "../types/pageTypes";
import { handleApiError } from "../utils/apiUtils";
export default function useFetchDashboard() {
    const [dashboard,setDashboard] = useState<DashboardResponse | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchDashboard = async() =>{
            try{
                const response=await axiosClient.get('/dashboard')
               
                const data=response.data;

                setDashboard(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchDashboard();
        
    },[])



    return {dashboard,loading,error};
}