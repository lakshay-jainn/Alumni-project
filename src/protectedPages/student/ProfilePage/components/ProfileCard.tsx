import { LucideIcon } from "lucide-react";
import {Link} from 'react-router-dom'
function ProfileCard({Icon,heading,text,className,href}:{Icon: LucideIcon,heading:string,text:string,className:string,href:string}){
    return(
        

        <div className={`bg-white border rounded-lg ${className}`}>
            <Link to={href}>
            <div className="flex gap-5 justify-center border-b py-2 items-center">
                <Icon className="scale-150"/>
                <h1 className="font-bold text-xl">{heading}</h1>
            </div>
                <p className="my-2">{text}</p>
            </Link>
        </div>
    
    )
}


export default ProfileCard;