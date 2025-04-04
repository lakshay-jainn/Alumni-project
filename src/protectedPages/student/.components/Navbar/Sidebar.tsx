import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  
  useEffect(() => {
    // Set active menu item based on current path
    const currentPath = location.pathname;
    const matchingItem = menuItems.find(item => 
      currentPath === item.path || currentPath.startsWith(`${item.path}/`)
    );
    
    if (matchingItem) {
      setActiveItem(matchingItem.id);
    }
  }, [location.pathname]);
  
  const colors = {
    primary: '#95323d',
    primaryLight: '#c04757',
    primaryDark: '#7c2a32',
    gray600: '#718096',
    textSecondary: '#4a5568',
  };
  
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: 'home', 
      path: '/dashboard',
      badge: null 
    },
    { 
      id: 'connections', 
      label: 'Connections', 
      icon: 'users', 
      path: '/connections',
      badge: 3 
    },
    { 
      id: 'events', 
      label: 'Events', 
      icon: 'calendar', 
      path: '/events',
      badge: null 
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: 'mail', 
      path: '/messages',
      badge: 2 
    },
    { 
      id: 'feeds', 
      label: 'Feeds', 
      icon: 'rss', 
      path: '/feeds',
      badge: null 
    },
    { 
      id: 'job-board', 
      label: 'Job Board', 
      icon: 'briefcase', 
      path: '/jobs',
      badge: null 
    },
  ];
  
  const Icon = ({ name, isActive }: { name: string, isActive: boolean }) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="px-6 py-6">
        <div className="text-sm font-medium text-gray-400">MAIN MENU</div>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <li key={item.id} className="mb-1 px-3">
                <NavLink
                  to={item.path}
                  className={`flex items-center justify-between w-full rounded-lg px-3 py-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#95323d]/5 text-[#95323d] font-medium' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${isActive ? 'text-[#95323d]' : 'text-gray-500'}`}>
                      <Icon name={item.icon} isActive={isActive} />
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#95323d] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;