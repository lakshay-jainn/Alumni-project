import './ProfilePage.module.css'
import {User,GraduationCap,BriefcaseBusiness,Newspaper,Cpu} from 'lucide-react'
import ProfileCard from './components/ProfileCard';
function ProfilePage(){
    return(
        <div className='w-full flex flex-col gap-5 py-10 max-w-screen-lg'>
            <div className='border rounded-lg w-full p-10 text-center flex flex-col gap-5 items-center justify-center bg-white'>
                <img className='rounded-full w-32' src="/img_avatar.png" alt="" />
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl'>Lakshay</h1>
                    <h1 className='font-medium text-xl'>Lakshay@gmail.com</h1>
                    <h1 className='font-medium text-xl'>Student</h1>
                    <h1 className='font-medium text-xl'>2023-24</h1>
                </div>
            </div>
            <div className='md:gap-5 flex flex-col'>
            <div className='text-center grid grid-cols-3 gap-5 items-center justify-center '>

                <ProfileCard 
                href={'./personal-details/'}
                className={'col-span-3 md:col-span-1'} 
                Icon={User} 
                heading={'Personal Details'} 
                text={'Add or modify your personal information such as your name, profile photo, address, email, password etc.'} />
               
                <ProfileCard 
                 href={'./educational-details/'}
                className={'col-span-3 md:col-span-1'} 
                Icon={GraduationCap} 
                heading={'Educational Details'} 
                text={'Add or modify your personal information such as your name, profile photo, address, email, password etc.'} />

                <ProfileCard 
                 href={'./experience-details/'}
                className={'col-span-3 md:col-span-1'} 
                Icon={BriefcaseBusiness} 
                heading={'Experience Details'} 
                text={'Add or modify your personal information such as your name, profile photo, address, email, password etc.'} />
            </div>
            <div className='text-center grid grid-cols-6 gap-5 items-center justify-center '>
                {/* EMPTY DIV JUST FOR ALIGNMENT */}
                <div></div>

                <ProfileCard 
                 href={'./skills-details/'}
                className={'md:col-span-2 col-span-6'} 
                Icon={Cpu} heading={'Skill Details'} 
                text={'Add or modify your personal information such as your name, profile photo, address, email, password etc.'} />
       
                <ProfileCard 
                 href={'./employment-details/'}
                className={'md:col-span-2 col-span-6'} 
                Icon={Newspaper} 
                heading={'Employment Details'} 
                text={'Add or modify your personal information such as your name, profile photo, address, email, password etc.'} />
             
                {/* EMPTY DIV JUST FOR ALIGNMENT */}
                <div></div>
            </div>
            </div>
            
        </div>
    );
    
}

export default ProfilePage;
