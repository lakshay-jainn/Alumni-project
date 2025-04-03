
// import "./admin.css"
import { MainNav } from "./.components/main-nav"
import { UserNav } from "./.components/user-nav"
import { Outlet } from "react-router-dom"
export default function Admin_Page() {
  return (

          <div className="flex min-h-screen flex-col bg-white items-center">

            <header className="sticky top-0 z-40 border-b bg-white container ">
                <div className="container flex h-16 items-center justify-between py-4">
                  <MainNav />
                  <UserNav />
                </div>
            </header>

            <main className="flex-1 container py-6 bg-white">
              <Outlet/>
              </main>

          </div>

  )
}