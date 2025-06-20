
import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { NotifResponse } from "../types/pageTypes";
import { handleApiError } from "../utils/apiUtils";
export default function useFetchNotif(reloadNotifs:boolean) {
    const [notifs,setNotif] = useState<NotifResponse[] | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchNotif = async() =>{
            try{
                const response=await axiosClient.get('/dashboard/notif')
               
                const data=response.data;

                setNotif(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        console.log('notif api called');
        fetchNotif();
        
    },[reloadNotifs])



    return {notifs,setNotif,loading,error};
}