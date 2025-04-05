import {useState,useEffect} from 'react';
import axiosClient from '@/api/axios/axiosClient';
import { handleApiError } from '@/api/utils/apiUtils';
import { profileDetailsResponse } from '@/api/types/profileDetailsTypes';

export default function useFetchAllProfileDetails() {
    
    const profileFetchUrl='/profile';
    const [profileDetails,setPersonalDetails]=useState<profileDetailsResponse | undefined>();
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<null | any>(null);

    useEffect(()=>{

        const fetchProfile= async()=> {
            try{
            const res=await axiosClient.get(profileFetchUrl)


            setPersonalDetails(res.data)
            }

            catch(error : any){
                const errorResponse=handleApiError(error);
                setError(errorResponse.message)
            } 
            finally{
                setLoading(false);
            }
           
    }
        fetchProfile();
      
    },[]);
    console.log(profileDetails)
    return {profileDetails,loading,error};

}


