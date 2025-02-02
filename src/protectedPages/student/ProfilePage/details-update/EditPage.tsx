import { Outlet ,useLocation} from "react-router-dom";
import {User,GraduationCap,BriefcaseBusiness,Newspaper,Cpu,ChevronLeft} from 'lucide-react'
import { Link } from "react-router-dom";
import { ReactNode } from "react";
type RouteIconMap = {
    [key: string]: [ReactNode,string]; 
  };
const routeIconMap : RouteIconMap = {
        '/profile/edit/personal-details/': [<User className="scale-150" />,'Personal Details'],
        '/profile/edit/educational-details/': [<GraduationCap className="scale-150" />,'Educational Details'],
        '/profile/edit/experience-details/': [<BriefcaseBusiness className="scale-150" />,'Experience Details'],
        '/profile/edit/skills-details/': [<Cpu className="scale-150" />,'Skill Details'],
        '/profile/edit/employment-details/': [<Newspaper className="scale-150" />,'Employment Details'],
    };
  

function EditPage(){
    
    const location = useLocation();
    const currentIcon : [ReactNode,string] = routeIconMap[location.pathname]

    return (
        <div className="p-5 w-full max-w-screen-lg">
        <div className="border bg-white rounded-lg w-full ">
            <div className="flex gap-5 justify-center border-b py-2 items-center relative">
                <Link to='../' className="absolute left-2" > <ChevronLeft className="scale-150 " /></Link>
              
                {currentIcon[0]}
                <h1 className="font-bold text-xl">{currentIcon[1]}</h1>
            </div>
            <div className="p-5">
            <Outlet />
            </div>
        </div>
        </div>
        
    )
}

export default EditPage;