import {useEffect,useState} from "react"
import adminAxiosClient from "@/api/axios/adminAxiosClient"
import { handleApiError } from "@/api/utils/apiUtils"
import { AlumniRequest } from "@/api/types/adminTypes"
export default function useFetchPendingRequests(refetchTable:boolean) {
  
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const [pendingRequests, setPendingRequests] = useState<AlumniRequest[] | null>(null)
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try{
        const response = await adminAxiosClient.get("/admin/pending")
        console.log(response)
        setPendingRequests(response.data)
      }catch(error){
        const errorMessage = handleApiError(error);
        if (errorMessage.message === "Unauthorized") {
          setError("Unauthorized access. Please log in again.");
        }
      }finally{
            setLoading(false)
        }   
    }
    fetchPendingRequests()
},[refetchTable])
    return {pendingRequests, loading, error}
}


