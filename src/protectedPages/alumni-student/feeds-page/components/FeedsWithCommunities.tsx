import ScrollbarCss from "@/scrollbarCss/ScrollbarCss"
import CreatePost from "./CreatePost"

// import Communities from "./Communities";
// import MobileCommunitiesModal from "./MobileCommunitiesModal";
import Feeds from "./Feeds";
export default function FeedsWithCommunities({fetchAgain,setFetchAgain}:{fetchAgain:boolean,setFetchAgain:(value: (newValue : boolean)=>boolean )=>void}){
    // const {fetchAgain,setFetchAgain} = useOutletContext<{fetchAgain:boolean,setFetchAgain:(value: (newValue : boolean)=>boolean )=>{}}>()!;
    return (
        <>
        {/*  feeds that is scrollable  */}
        
        <div className={`w-full px-5 ${ScrollbarCss} flex-1 `}>
            <div className="hidden md:block">
                <CreatePost setFetchAgain={setFetchAgain} />
            </div>
            {/* <div className="sticky w-full top-0 z-10 flex border-2 bg-white justify-between items-center px-5 py-2 rounded-2xl">
                Filter Posts by Communities
                <MobileCommunitiesModal />
            </div> */}
            
            <Feeds fetchAgain={fetchAgain} />
        </div>
        {/*  sticky communities tab  */}
        {/* <div className="hidden md:block flex-[0.30] sticky top-0 h-screen p-5">
            <Communities />
        </div> */}
        

        </>
       
    )
}