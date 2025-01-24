import { createContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
type AuthContextType = {
  token: string | null | boolean;
  setToken: (token: string | null | boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
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
            setIsLoggedIn(true);
      
          }
          else {
            setToken(false)
          }
    
    }, []);
  const Logout=()=>{
      localStorage.removeItem("token")
      setToken(false)
      setIsLoggedIn(false)
    }
  if (token !== null){

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn ,Logout}}>
      {children}
    </AuthContext.Provider>
  );
}}

export default AuthProvider;