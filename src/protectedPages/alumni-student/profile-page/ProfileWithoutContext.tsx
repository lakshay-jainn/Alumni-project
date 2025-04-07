import { ChartComponent } from './components/CustomChart';
import {Pencil} from 'lucide-react'
import ResumeProfile from './components/BelowProfile';
import { useState } from 'react';
import EditProfileModal from './components/EditProfileModal';
import { useProfile } from './ProfileContext';
import { useEffect } from 'react';
function ProfilePageWithoutContext(){
    const { profileDetails, loading, error } = useProfile();
    const [editProfileModal,setEditProfileModal] = useState(false);
    const [activeSelection,setActiveSelection] = useState<"basic" | "resume" | "about" | "skills" | "education" | "work" | "accomplishments" | "personal" | "social">("basic")
    useEffect(()=>{
        if(!loading && !error && profileDetails){
            console.log(profileDetails.profileCompletionPercentage);
            if (profileDetails.basic.firstName == undefined || profileDetails.basic.lastName == undefined || profileDetails.profileCompletionPercentage === "0") {
                
                setEditProfileModal(true);
        
    }}},[profileDetails,loading,error])
    if (loading) return <div className='flex justify-center items-center h-screen'>Loading...</div>
    if (error) return <div className='flex justify-center items-center h-screen'>{error.message}</div>
    const percentageValue = profileDetails?.profileCompletionPercentage ? profileDetails?.profileCompletionPercentage : "0%";
    return(
        <div className='w-full flex flex-col gap-5  shadow-lg'>
            <EditProfileModal activeSelection={activeSelection} editProfileModal={editProfileModal} setEditProfileModal={setEditProfileModal}/>
            <div className='bg-white rounded-xl relative overflow-clip'>
                <img style={{aspectRatio:"1180/209"}} src={profileDetails?.banner} alt="" className='w-full object-cover ' />
                <button className='absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-red-100 cursor-pointer'>
                    <Pencil className='' size={15} color="#000"  />
                </button>
                <div className='flex justify-between items-center gap-5 bg-white'>
                 <div className='flex'>
                    <div className='relative'>
                        <ChartComponent percentage={profileDetails?.profileCompletionPercentage} />
                        <img className="absolute inset-0 rounded-full aspect-square object-center p-6   " src={profileDetails?.profileImage} alt="" /> 
                        <div className='border-1 bottom-0 absolute -translate-[50%] left-[50%] main-text-red-color border-[#95323d] px-1 text-[12px] bg-white p-0 z-50'>{percentageValue}</div>
                    </div>
                    <div className='flex flex-col justify-center '>
                        <h1 className='font-bold text-xl'>{profileDetails?.basic.firstName && profileDetails.basic.firstName } {profileDetails?.basic.lastName && profileDetails.basic.lastName}</h1>
                        <p className='text-gray-500'>@{profileDetails?.username}</p>
                    </div>
                 </div>
                 <div>
                    <button onClick={()=>setEditProfileModal(true)} className='p-3 max-h-max text-white bg-[#95323d]  mr-5 rounded-xl'> <span>Edit Profile<Pencil className='ml-5 inline' /></span></button>
                 </div>
                </div>
            </div>
            <div className='bg-white rounded-xl relative overflow-clip w-full'>
                <ResumeProfile setActiveSection={setActiveSelection} setEditProfileModal={setEditProfileModal}/>

            </div>
        </div>
    );
    
}




export default ProfilePageWithoutContext;
