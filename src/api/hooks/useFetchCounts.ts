import {useEffect,useState} from "react"
import adminAxiosClient from "@/api/axios/adminAxiosClient"
import { handleApiError } from "@/api/utils/apiUtils"
type CountData = {
    alumniCount: number;
    studentCount: number;
    pendingRequests: number;
}
export default function useFetchCounts() {
  
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const [CountData, setCountData] = useState<CountData>({
        alumniCount: 0,
        studentCount: 0,
        pendingRequests: 0,
    })
  useEffect(() => {
    const fetchCounts = async () => {
      try{
        const response = await adminAxiosClient.get("/admin/count")
        setCountData(response.data)
      }catch(error){
        const errorMessage = handleApiError(error);
        if (errorMessage.message === "Unauthorized") {
          setError("Unauthorized access. Please log in again.");
        }
      }finally{
            setLoading(false)
        }   
    }
    fetchCounts()
},[])
    console.log(CountData)
    return {CountData, loading, error}
}