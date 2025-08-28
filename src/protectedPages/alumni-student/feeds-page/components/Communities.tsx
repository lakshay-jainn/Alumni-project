import SingleCommunity from "./SingleCommunity";
import useFetchCommunities from "@/api/hooks/useFetchCommunities";
import {InitialCommunitiesResponse} from "@/api/types/FeedsTypes";
import {memo, useState} from 'react'
const Communities = memo(({setSelectedCommunities,selectedCommunities}:{setSelectedCommunities:React.Dispatch<React.SetStateAction<string[]>>,selectedCommunities:string[]}) => {
    const [communities,loading,error]=useFetchCommunities();
    

    const navItemClass = ({ isActive }:{isActive: boolean }) =>
        `flex items-center p-3 rounded-lg transition-colors 
        ${isActive ? 'bg-gradient-to-r from-red-400 to-orange-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`;
    if(loading){
        return <div>Communities are loading</div>
    }
    if (error){
        return <div>Something went wrong please refresh {error}</div>
    }
    if (!communities){
        return <div>No communities to show</div>
    }
    


    return (
        <>
        <h1 className="px-3 font-bold text-3xl">Filters</h1>
        <div className="flex flex-col gap-2  max-h-[70vh] overflow-y-auto p-5">
            <SingleCommunity  id={"connection-tab"} name={"Connections"} description={"Your Connections"}  setSelectedCommunities={setSelectedCommunities} selectedCommunities={selectedCommunities}/>

            {communities.map((community : InitialCommunitiesResponse)=>(
                <SingleCommunity key={community.id}  {...community} setSelectedCommunities={setSelectedCommunities} selectedCommunities={selectedCommunities}/>
            ))}
        </div>
        </>
    )

})
export default Communities;