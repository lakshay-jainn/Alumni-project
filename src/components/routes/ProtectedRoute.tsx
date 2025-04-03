import { AuthContext } from "@/Auth/AuthContext";
import { useContext} from "react";
import { Outlet,Navigate } from "react-router-dom";
type Role = "ALUMNI" | "ADMIN" | "STUDENT";
function ProtectedRoute({redirectPath,restrictedTo}:{redirectPath:string,restrictedTo:Role[]}) {
    
    const {isLoggedIn,role}=useContext(AuthContext)!;

    if (isLoggedIn){
        if (restrictedTo.includes(role!)){
        return (<Outlet />)
        }
        else{
            return (<p>unauthorized</p>)
        }

    }else{
        return(<Navigate to={redirectPath} replace />)
    }
}
export default ProtectedRoute
