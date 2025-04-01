import { AuthContext } from "@/Auth/AuthContext";
import { useContext} from "react";
import { Outlet,Navigate } from "react-router-dom";
function UnprotectedRoute({redirectPath}:{redirectPath:string}) {
    
    const {isLoggedIn}=useContext(AuthContext)!;
    if (!isLoggedIn){
        return (
        <Outlet />
    )

    }else{
        
        return(<Navigate to={redirectPath} replace />)
    }
}
export default UnprotectedRoute;