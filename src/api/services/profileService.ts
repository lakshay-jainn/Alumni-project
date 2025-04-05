import { profileDetailsPayload } from "@/api/types/profileDetailsTypes";
import axiosClient from "@/api/axios/axiosClient";

export const updateProfileDetails = async (data: any ) => {

    const personalUpdateUrl = "/profile";
   
      const response = await axiosClient.post(personalUpdateUrl,data);

       return response.data;
   };
