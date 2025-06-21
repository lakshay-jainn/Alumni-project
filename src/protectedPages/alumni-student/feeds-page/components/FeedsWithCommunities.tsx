import ScrollbarCss from "@/scrollbarCss/ScrollbarCss"
import CreatePost from "./CreatePost"

import Communities from "./Communities";
import MobileCommunitiesModal from "./MobileCommunitiesModal";
import Feeds from "./Feeds";
import { useEffect, useState } from "react";
export default function FeedsWithCommunities({fetchAgain,setFetchAgain}:{fetchAgain:boolean,setFetchAgain:(value: (newValue : boolean)=>boolean )=>void}){
    // const {fetchAgain,setFetchAgain} = useOutletContext<{fetchAgain:boolean,setFetchAgain:(value: (newValue : boolean)=>boolean )=>{}}>()!;
    const [selectedCommunities,setSelectedCommunities] = useState<string[]>([]);
    useEffect(()=>{
        setFetchAgain((prev)=>!prev)
    },[selectedCommunities])

    return (
        <div className="flex w-full">
        {/*  feeds that is scrollable  */}
        <div className="flex-1 md:flex-[0.70]">
            <div className="sticky w-full top-1 z-10 flex rounded-lg border-2 bg-white px-5 py-2 md:hidden shadow-2xl">
                <div className="w-full flex justify-between items-center">
                Filter Posts
                <MobileCommunitiesModal  >
                    <Communities setSelectedCommunities={setSelectedCommunities} selectedCommunities={selectedCommunities}  />
                </MobileCommunitiesModal >
                </div>
            </div>
        <div className={`self-center mx-auto max-w-[35rem] px-5 ${ScrollbarCss} flex-1 `}>
            <div className="hidden md:block">
                <CreatePost setFetchAgain={setFetchAgain} />
            </div>

            
            <Feeds fetchAgain={fetchAgain} communities={selectedCommunities} />
        </div>
        </div>
        {/*  sticky communities tab  */}
        <div className="hidden md:block flex-[0.30] sticky top-0 p-5 max-h-[75vh]">
            <Communities selectedCommunities={selectedCommunities} setSelectedCommunities={setSelectedCommunities}  />
        </div>
        

        </div>
       
    )
}