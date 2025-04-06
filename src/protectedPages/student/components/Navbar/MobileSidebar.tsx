import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  X,
  Home,
  Users,
  Mail,
  MessageCircle,
  Rss,
  Briefcase,
  Search,
  LogOut} from 'lucide-react';

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'connections', label: 'Connections', icon: Users, path: '/connections' },
    { id: 'alumni', label: 'Alumni', icon: Search, path: '/alumni-search' },
    { id: 'inbox', label: 'Inbox', icon: Mail, path: '/inbox' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'feeds', label: 'Feeds', icon: Rss, path: '/feeds' },
    { id: 'job-board', label: 'Job Board', icon: Briefcase, path: '/jobs' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="mb-1 px-3">
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center w-full px-6 py-3 rounded-lg transition-colors duration-200 ${
                        isActive ? 'bg-gray-50 font-medium' : 'hover:bg-gray-50'
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? colors.primary : colors.textSecondary,
                      borderLeft: isActive ? `4px solid ${colors.primary}` : '4px solid transparent',
                    })}
                  >
                    <span className="mr-3" style={{ color: isActive ? colors.primary : colors.gray600 }}>
                      <IconComponent className="w-5 h-5" />
                    </span>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center justify-center w-full gap-2 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
