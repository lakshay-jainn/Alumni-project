import { createContext, useState, useEffect, ReactNode } from "react";
import { setLogout } from "@/api/axios/AuthBridge"
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
// Define the type for the context value
type Role = "ALUMNI" | "ADMIN" | "STUDENT";
type AuthContextType = {
  token: string | null | boolean;
  isLoggedIn: boolean;
  Login : (token : string )=> void;
  Logout: ()=>void;
  role : Role | null;
};

// Create the context with an initial value of `null` or a default object
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the type for the AuthProvider props
type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null | boolean>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken= localStorage.getItem("token");

    if (storedToken) {
            const decodedToken: any = jwtDecode(storedToken);
            setRole(decodedToken.role);
            setToken(storedToken);
            GlobalStorage.setToken(storedToken);
            setIsLoggedIn(true);

          }
          else {
            setToken(false)
          }
    
    setLogout(Logout);
    }, []);


  const Logout=()=>{
      localStorage.removeItem("token")
      setToken(false)
      setIsLoggedIn(false)
      setRole(null);
    }
  const Login = (token : string) => {
      localStorage.setItem("token",token)
      const decodedToken: any = jwtDecode(token);
      setRole(decodedToken.role);
      setIsLoggedIn(true)
      setToken(token)
    }

  if (token !== null){

  return (
    <AuthContext.Provider value={{ token, isLoggedIn , Login, Logout, role}}>
      {children}
    </AuthContext.Provider>
  );
}}

export default AuthProvider;


let token : (string |  null) = null;
export const GlobalStorage = {
  setToken: (argtoken :string ) => { token = argtoken; },
  getToken: () => token,
};
