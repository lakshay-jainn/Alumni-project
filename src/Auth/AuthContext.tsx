import { createContext, useState, useEffect, ReactNode } from "react";
import { setLogout } from "@/api/axios/AuthBridge"
// Define the type for the context value
type AuthContextType = {
  token: string | null | boolean;
  isLoggedIn: boolean;
  Login : (token : string )=> void;
  Logout: ()=>void;
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


  // Check for token in localStorage on component mount
  useEffect(() => {
    const storedToken= localStorage.getItem("token");

    if (storedToken) {
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
    }
  const Login = (token : string) => {
      localStorage.setItem("token",token)
      setIsLoggedIn(true)
      setToken(token)
    }

  if (token !== null){

  return (
    <AuthContext.Provider value={{ token, isLoggedIn , Login, Logout}}>
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
