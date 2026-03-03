import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Folder, Calendar, Settings, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, collapsed, onToggle }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', icon: Home, label: '工作台', path: '/' },
    { id: 'projects', icon: Folder, label: '项目管理', path: '/' },
    { id: 'calendar', icon: Calendar, label: '投标日历', path: '/' },
    { id: 'templates', icon: FileText, label: '模板库', path: '/' },
    { id: 'settings', icon: Settings, label: '系统设置', path: '/' },
  ];

  return (
    <div className={`bg-white h-full border-r border-gray-200 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && <span className="font-bold text-xl text-brand">标桥·企业空间</span>}
        <button onClick={onToggle} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-3 rounded-lg transition-colors ${isActive ? 'bg-brand-light text-brand' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className={isActive ? 'text-brand' : 'text-gray-500'} />
              {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

