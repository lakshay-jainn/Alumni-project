import { Outlet } from "react-router-dom";
export default function FeedsPage(){
    return (
        <main className="w-full h-full relative bg-gradient-to-r from-neutral-200 to-orange-300">
             <div className="h-full fixed z-0 left-0 right-0 top-0 bg-gradient-to-r from-amber-100 to-orange-100">
            </div>
            <Outlet />
        </main>
    )
}


//container mx-auto py-8 space-y-8
//bg-gradient-to-r from-orange-100 to-emerald-100