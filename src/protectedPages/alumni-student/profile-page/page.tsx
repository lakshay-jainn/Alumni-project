import { ChartComponent } from './components/CustomChart';
import {Pencil} from 'lucide-react'
import ResumeProfile from './components/ResumeProfile';
import { useState } from 'react';
import EditProfileModal from './components/EditProfileModal';
function ProfilePage(){
    const [editProfileModal,setEditProfileModal] = useState(false);
    const [activeSelection,setActiveSelection] = useState<"basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social">("basic")
    return(
        <div className='w-full flex flex-col gap-5 py-10 max-w-(--breakpoint-lg)'>
            <EditProfileModal activeSelection={activeSelection} editProfileModal={editProfileModal} setEditProfileModal={setEditProfileModal}/>
            <div className='bg-white rounded-xl relative overflow-clip'>
                <img style={{aspectRatio:"1180/209"}} src="pic.jpg" alt="" className='aspect-auto object-cover ' />
                <button className='absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-red-100 cursor-pointer'>
                    <Pencil className='' size={15} color="#000"  />
                </button>
                <div className='flex justify-between items-center gap-5 bg-white'>
                 <div className='flex'>
                    <div className='relative'>
                        <ChartComponent />
                        <img className="absolute inset-0 rounded-full aspect-square object-center p-6   " src="1.jpg" alt="" /> 
                    </div>
                    <div className='flex flex-col justify-center '>
                        <h1 className='font-bold text-xl'>Joshua nigger Doe</h1>
                        <p className='text-gray-500'>@username</p>
                    </div>
                 </div>
                 <div>
                    <button onClick={()=>setEditProfileModal(true)} className='p-3 max-h-max text-white bg-blue-500  mr-5 rounded-xl'> <span>Edit Profile<Pencil className='ml-5 inline' /></span></button>
                 </div>
                </div>
            </div>
            <div className='bg-white rounded-xl relative overflow-clip w-full'>
                <ResumeProfile setActiveSection={setActiveSelection} setEditProfileModal={setEditProfileModal}/>

            </div>
        </div>
    );
    
}




export default ProfilePage;
