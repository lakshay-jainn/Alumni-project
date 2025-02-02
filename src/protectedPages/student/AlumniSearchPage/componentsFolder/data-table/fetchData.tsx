import { Payment } from "./columns.tsx"
import axios from "axios";


export async function getData(token:  (string | boolean | null) ): Promise<Payment[]> {

  const BACKEND_URL = "http://localhost:8080/api/v1/alumni-student/showallalumni";
    try {
      const res= await axios.get(BACKEND_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
      },
      });
      const data=res.data
      if (res.status===200){
        return data.data.map((data : any)=>({
          id:data.userId,
          name:data.name,
          jobtitle:data.jobTitle,
          company:data.company,
          batch:data.batch,
          course:data.course,
          img:data.profileImage,
        }))
      }

    
    } catch (e) {
      // throw new Error(". Please try again")
    }
    return Promise.reject('Data not found')
}

 
