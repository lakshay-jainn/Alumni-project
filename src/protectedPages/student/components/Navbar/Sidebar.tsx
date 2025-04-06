import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Home,
  Users,
  Mail,
  MessageCircle,
  Rss,
  Briefcase,
  Search,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find(
      item => currentPath === item.path || currentPath.startsWith(`${item.path}/`)
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
      icon: Home,
      path: '/dashboard',
      badge: null,
    },
    {
      id: 'connections',
      label: 'Connections',
      icon: Users,
      path: '/connections',
      badge: 3,
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
      icon: MessageCircle,
      path: '/messages',
      badge: 2,
    },
    {
      id: 'feeds',
      label: 'Feeds',
      icon: Rss,
      path: '/feeds',
      badge: null,
    },
    {
      id: 'job-board',
      label: 'Job Board',
      icon: Briefcase,
      path: '/jobs',
      badge: null,
    },
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="px-6 py-6">
        <div className="text-sm font-medium text-gray-400">MAIN MENU</div>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

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
                    <item.icon
                      size={18}
                      className={`mr-3 ${isActive ? 'text-[#95323d]' : 'text-gray-500'}`}
                    />
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
