
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {CirclePlus} from 'lucide-react'

import { useState } from "react";
import CreatePost from "./components/CreatePost";

import FeedsWithCommunities from "./components/FeedsWithCommunities";
function FeedsPage(){
    // const [sidebarModal,setSidebarModal] = useState(false);
    const [createPostModal,setCreatePostModal] = useState(false);
    const [fetchAgain,setFetchAgain] = useState(false);
    return (
        <main className={`relative w-full my-2 p-2`}>
        <section className="w-full flex flex-col md:flex-row md:max-w-(--breakpoint-xl) mx-auto"> 
            <div className="flex flex-1">
                
                    <FeedsWithCommunities fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                
            </div>
            <div className="p-10 md:p-0"></div>

            <footer className="md:hidden fixed bottom-0 w-full z-50 bg-white ">
                <div className="justify-center w-full flex items-center border-t-2 py-2">
                <Dialog open={createPostModal} onOpenChange={setCreatePostModal}>
                        <DialogTrigger asChild>
                            <button onClick={()=>setCreatePostModal(true)} className="bg-gradient-to-r from-red-400 to-orange-400 h-fit rounded-full p-3">
                                <CirclePlus className="w-6 h-6 text-white" />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl">
                        <DialogDescription></DialogDescription>
                            <DialogTitle>
                            </DialogTitle>
                            <CreatePost setFetchAgain={setFetchAgain} setCreatePostModal={setCreatePostModal}/>
                        </DialogContent>
                        
                    </Dialog>
                </div>
                

            </footer>
        </section>
        </main>
    )
}

export default FeedsPage;

