import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MobileSidebar = ({ isOpen, onClose, onLogout }: MobileSidebarProps) => {
  const location = useLocation();
  const colors = {
    primary: '#95323d',
    primaryLight: '#c04757',
    primaryDark: '#7c2a32',
    gray600: '#718096',
    textSecondary: '#4a5568',
  };
  
  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/dashboard' },
    { id: 'connections', label: 'Connections', icon: 'users', path: '/connections' },
    { id: 'events', label: 'Events', icon: 'calendar', path: '/events' },
    { id: 'messages', label: 'Messages', icon: 'mail', path: '/messages' },
    { id: 'feeds', label: 'Feeds', icon: 'rss', path: '/feeds' },
    { id: 'job-board', label: 'Job Board', icon: 'briefcase', path: '/jobs' },
  ];
  
  const Icon = ({ name }: { name: string }) => {
    const iconProps = {
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };

    switch (name) {
      case 'home':
        return <svg {...iconProps}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
      case 'users':
        return <svg {...iconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
      case 'calendar':
        return <svg {...iconProps}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
      case 'mail':
        return <svg {...iconProps}><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
      case 'rss':
        return <svg {...iconProps}><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>;
      case 'briefcase':
        return <svg {...iconProps}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
      case 'log-out':
        return <svg {...iconProps}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay with fade-in/out animation */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar drawer with slide animation */}
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="logo-container relative h-8 w-8 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#95323d] to-[#c04757]"></div>
              <span className="relative text-white font-bold text-lg">A</span>
            </div>
            <div className="font-semibold text-gray-900">
              Alumni <span className="text-[#95323d]">Connect</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-4 pb-24">
          <ul>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id} className="mb-1 px-3">
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `flex items-center w-full px-6 py-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'
                    }`}
                    style={({ isActive }) => ({
                      color: isActive ? colors.primary : colors.textSecondary,
                      borderLeft: isActive ? `4px solid ${colors.primary}` : '4px solid transparent',
                    })}
                  >
                    <span className="mr-3" style={{ color: isActive ? colors.primary : colors.gray600 }}>
                      <Icon name={item.icon} />
                    </span>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Logout button at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
          <button 
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center justify-center w-full gap-2 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <span className="mr-1">
              <Icon name="log-out" />
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;