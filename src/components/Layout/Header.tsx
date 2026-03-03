import React, { useState } from 'react';
import { Bell, Search, Menu, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../../constants';
import { useStore } from '../../store/useStore';
import { NotificationPanel } from './NotificationPanel';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    setIsSidebarCollapsed,
    isSidebarCollapsed
  } = useStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleViewDetails = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
      <div className="flex items-center flex-1">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 -ml-2 mr-2 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="max-w-md w-full hidden md:flex items-center relative">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索项目、标书或关键字..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onViewDetails={(id) => {
                handleViewDetails(id);
                setShowNotifications(false);
              }}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium text-gray-900">{CURRENT_USER.name}</div>
            <div className="text-xs text-gray-500">{CURRENT_USER.company}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-light text-brand flex items-center justify-center overflow-hidden border border-brand/20">
            {CURRENT_USER.avatar ? (
              <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={18} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

