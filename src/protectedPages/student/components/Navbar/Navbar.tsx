import { User, Menu,Bell,X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/Auth/AuthContext";
import { useContext, useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import ReactDOM from "react-dom";
import useFetchNotif from "@/api/hooks/useFetchNotif";
import { deleteNotif } from "@/api/services/notifService";
import { handleApiError } from "@/api/utils/apiUtils";
import { toast } from "sonner";
const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { Logout } = useContext(AuthContext)!;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotif,setShowNotif] = useState(false);
  const [reloadNotifs,setReloadNotifs] = useState(false);
  const {notifs,setNotif,loading,error} = useFetchNotif(reloadNotifs);
  console.log('rerender');
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);

  
    return () => {window.removeEventListener('scroll', handleScroll)};
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    Logout();
    navigate('/auth/login');
  };
  const notifNavigate = (notif:any) => {
    if (notif.url){
      setShowNotif(false)
      navigate(notif.url);
    }
  }

  const deleteNotificationAPI = async (notif:any) =>{
    try{

      await deleteNotif(notif.id);

    }catch(error){
      setNotif((prev)=> [notif,...(prev ?? [])].sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      
      const errorMessage = handleApiError(error);
      toast.error(errorMessage.message);


    }

  }
  return (
    <>
      {/* Removed container and padding for full width */}
      <div className={`w-full bg-white py-4 px-6 border-0 ${scrolled ? 'shadow-md' : 'shadow-sm'} flex items-center justify-between transition-all duration-300 backdrop-blur-sm bg-white/90`}>
        {/* Mobile Menu Button - Left */}
        <button 
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Logo - Centered on mobile, left on desktop */}
        <Link to="/dashboard" className="no-underline mx-auto md:ml-0 md:mr-auto">
          <div className="flex items-center gap-2">
            <div className="logo-container relative h-8 w-8 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#95323d] to-[#c04757] animate-gradient"></div>
              <div className="absolute inset-0 opacity-10 pattern-overlay"></div>
              <span className="relative text-white font-bold text-lg flex items-center justify-center">
                <span className="drop-shadow-sm">A</span>
                <span className="absolute h-0.5 w-4 bg-white/80 -bottom-0.5 rounded-full"></span>
              </span>
              <div className="absolute top-0 right-0 h-2 w-2 bg-white/20 rounded-bl-lg"></div>
            </div>
            <div className="font-semibold text-sm sm:text-base text-gray-900">
              Alumni <span className="text-[#95323d]">Connect</span>
            </div>
          </div>
        </Link>

        {/* Profile Button - Right */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <div className="text-xs text-gray-500">Welcome back</div>
            <div className="text-sm font-medium text-gray-800">Alumni User</div>
          </div>
          <Link to='/profile'>
            <button 
              className="flex justify-center items-center rounded-full aspect-square p-2 bg-[#95323d] text-white transition-all duration-200 hover:bg-[#7c2a32] shadow-sm hover:shadow"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>
          <div className="flex flex-col items-center gap-3 ml-2 relative"> 
            <button 
              className="flex justify-center relative items-center rounded-full aspect-square p-2 bg-slate-100 text-black border-1 transition-all duration-200 hover:bg-slate-200 shadow-sm hover:shadow"
              aria-label="Profile"
              onClick = {()=>{setShowNotif((prev)=>!prev)}}
            >
              <Bell className="h-5 w-5" />
              {
                 (!loading && !error && (notifs!.length>0) ) && (<span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-800 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">
  {notifs!.length}
            </span>)
              }

            </button>
            <div className={`bg-white    ${showNotif ? "flex":"hidden"} min-w-[350px] flex-col rounded-xl border-1 text-black absolute mt-[120%] max-w-max text-wrap -translate-x-[45%]`}>
              <h2 className="p-2 font-bold">Notifications</h2>
              <hr className=""/>
              {
                (!loading && !error && notifs!.length > 0) ? notifs!.map((notif,idx) => {
                  const prev_time=new Date(notif.createdAt);
                  const curr_time = new Date(Date.now());

                  let diff_yr = curr_time.getUTCFullYear() - prev_time.getUTCFullYear();
                  let diff_month = curr_time.getUTCMonth() - prev_time.getUTCMonth();
                  let diff_days = curr_time.getUTCDate() - prev_time.getUTCDate();
                  let diff_hours = curr_time.getUTCHours() - prev_time.getUTCHours();
                  let diff_minutes = curr_time.getUTCMinutes() - prev_time.getUTCMinutes();
                  let diff_seconds = curr_time.getUTCSeconds() - prev_time.getUTCSeconds();

                  if (diff_seconds < 0){
                    diff_seconds = 60 + diff_seconds;
                    diff_minutes-=1

                  }
                  if (diff_minutes < 0){
                    diff_minutes = 60 + diff_minutes;
                    diff_hours-=1
                  }
                  if (diff_hours < 0){
                    diff_hours = 24 + diff_hours;
                    diff_days-=1
                  }
                  if (diff_days < 0){
                    let days_in_a_month = new Date(curr_time.getUTCFullYear(),curr_time.getUTCMonth(),0).getDate();
                    diff_days = days_in_a_month + diff_days;
                    diff_month-=1;
                  }
                  if (diff_month < 0){
                    diff_month = 12 + diff_month;
                    diff_yr-=1;
                  }
                  
                  let final_time = "";

                  if (diff_yr > 0) {
                    final_time = `${diff_yr} year${diff_yr > 1 ? "s" : ""} ago`;
                  } else if (diff_month > 0) {
                    final_time = `${diff_month} month${diff_month > 1 ? "s" : ""} ago`;
                  } else if (diff_days > 0) {
                    final_time = `${diff_days} day${diff_days > 1 ? "s" : ""} ago`;
                  } else if (diff_hours > 0) {
                    final_time = `${diff_hours} hr${diff_hours > 1 ? "s" : ""} ago`;
                  } else if (diff_minutes > 0) {
                    final_time = `${diff_minutes} min${diff_minutes > 1 ? "s" : ""} ago`;
                  } else if (diff_seconds > 0) {
                    final_time = `${diff_seconds} sec${diff_seconds > 1 ? "s" : ""} ago`;
                  } else {
                    final_time = "just now";
                  }


                  return(<div key={idx} className="w-full cursor-pointer hover:bg-gray-100" onClick={()=>{ notifNavigate(notif)}}>
                <div className="w-full flex gap-3 py-2 px-2 justify-center items-center" >
                  <img src={notif.logo} className="w-10 h-10 rounded-full border-1 shadow-md" alt="" />
                  <div className="flex flex-col flex-1">
                    <h3 className="font-medium">{notif.name[0].toUpperCase() + notif.name.slice(1)}</h3>
                    <p className="font-light text-[0.85rem] mt-[-5px]">{notif.action}</p>
                    <p className="font-bold">{notif.description}</p>
                  </div>
                  <div className="h-full flex flex-col justify-between">
                    <p className="self-start">{final_time}</p>
                    <button onClick={(event)=>{event.stopPropagation();setNotif((prev)=>prev!.filter((not)=>not.id!=notif.id));deleteNotificationAPI(notif)}} className="hover:bg-red-100 text-center border-1 rounded-xl text-[0.80rem] flex justify-center items-center bg-gray-50"><X className="inline w-4 h-4"/> DISMISS</button>
                  </div>
                  
                </div>
                <hr className=""/>
                  </div>)
              }) : ""
              }
              <div className="p-2 w-full text-center">
                <button className=" bg-red-800 text-white rounded-xl w-[99%]">View All</button> 
              </div>
              
            </div>
        </div>
      </div>
      
      {/* Mobile Sidebar - Rendered with Portal to ensure full viewport coverage */}
      {ReactDOM.createPortal(
        <MobileSidebar 
          isOpen={showMobileMenu} 
          onClose={() => setShowMobileMenu(false)}
          onLogout={handleLogout}
        />,
        document.body
      )}
    </>
  );
};

export default Navbar;