import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Menu, User } from "lucide-react";
  import { Card } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { NavLink,Link } from "react-router-dom";

import { AuthContext } from "@/Auth/AuthContext";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom'




  const Navbar = () => {
    const navigate=useNavigate();
    const {Logout}=useContext(AuthContext)!;
    return (
      <Card className="container bg-card py-3 px-4 border-0 flex items-center gap-6 rounded-2xl mt-5 justify-between">
        {/* <ShadcnKit c    lassName="text-primary cursor-pointer" /> */}
        <p className="font-bold">Alumni | Connect</p>
        
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
        <NavLink  className={({ isActive }: { isActive: boolean }) => isActive ? "font-medium" : "" } to='/dashboard'>
          <li className="text-primary">
            Home
          </li>
          </NavLink>
          <NavLink  className={({ isActive }: { isActive: boolean }) => isActive ? "font-medium" : "" } to='/alumni-search'>
          <li className="text-primary">
            Alumnis
          </li>
          </NavLink>
          <NavLink  className={({ isActive }: { isActive: boolean }) => isActive ? "font-medium" : "" } to='/feeds'>
          <li className="text-primary">
            Feeds
          </li>
          </NavLink>
        </ul>
        
  
        <div className="flex items-center">
    
          <Button onClick={()=>{Logout();navigate('/auth/login')}}  className=" hidden md:block justify-center items-center ml-2 mr-2 rounded-lg p-2 bg-[#95323d] text-center ">
            Logout
          </Button>
          
        <Link to='/profile'>
          <Button className=" flex justify-center items-center ml-2 mr-2 rounded-full aspect-square p-0 bg-[#95323d]   text-center ">
            
            <User className="scale-125 text-center " />
           
            </Button>
            </Link>
  
          <div className="flex md:hidden mr-2 items-center gap-2">
            
  
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="end">
              <NavLink  className={({ isActive }: { isActive: boolean }) => isActive ? "font-medium" : "" } to='/dashboard'>
                <DropdownMenuItem className="cursor-pointer">
                    Home
                </DropdownMenuItem>
                </NavLink>
                <NavLink  className={({ isActive }: { isActive: boolean }) => isActive ? "font-medium" : "" } to='/alumni-search'>
                <DropdownMenuItem className="cursor-pointer">
                    Alumnis
                </DropdownMenuItem>
                </NavLink>
                <NavLink  className={({ isActive }: { isActive: boolean }) => isActive ? "font-medium" : "" } to='/feeds'>
                <DropdownMenuItem className="cursor-pointer">
                    Feeds
                </DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem className="cursor-pointer">
                <Button onClick={()=>{Logout();navigate('/auth/login')}}  className=" md:hidden w-full  rounded-lg p-2 bg-[#95323d] text-center ">
                    Logout
                </Button>
                
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
  
        </div>
      </Card>
    );
  };
  
  
  
  export default Navbar;