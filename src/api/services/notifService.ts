
import axiosClient from "@/api/axios/axiosClient";

export const deleteNotif = async (notifId: any ) => {

    const personalUpdateUrl = "/dashboard/del-notif";
   
      const response = await axiosClient.post(personalUpdateUrl,{notifId:notifId});

       return response.data;
   };
