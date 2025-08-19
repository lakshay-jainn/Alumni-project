import {useEffect,useState} from "react"
import adminAxiosClient from "@/api/axios/adminAxiosClient"
import { handleApiError } from "@/api/utils/apiUtils"
import { AlumniRequest } from "@/api/types/adminTypes"
// type CountData = {
//     alumniCount: number;
//     studentCount: number;
//     pendingRequests: number;
// }
export default function useFetchAcceptedRequests() {
  
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const [acceptedRequests, setAcceptedRequests] = useState<AlumniRequest[] | null>(null)
  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try{
        const response = await adminAxiosClient.get("/admin/history")
        console.log(response)
        setAcceptedRequests(response.data)
      }catch(error){
        const errorMessage = handleApiError(error);
        console.log(errorMessage);
        if (errorMessage.message === "Unauthorized") {
          setError("Unauthorized access. Please log in again.");
        }
      }finally{
            setLoading(false)
        }   
    }
    fetchAcceptedRequests()
},[])
    return {acceptedRequests, loading, error}
}


