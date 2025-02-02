import { Outlet } from "react-router-dom";
export default function FeedsPage(){
    return (
        <main className="container mx-auto py-8 space-y-8">
            <Outlet />
        </main>
    )
}