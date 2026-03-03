import { create } from 'zustand';
import { Project, Notification, ProjectStatus, ProjectType } from '../types';
import { MOCK_PROJECTS, MOCK_NOTIFICATIONS } from '../constants';

interface AppState {
  // Projects
  projects: Project[];
  addProject: (projectData: Partial<Project>) => Project;
  
  // Notifications
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  
  // UI State
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isOpen: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Projects
  projects: MOCK_PROJECTS,
  addProject: (projectData) => {
    const newProject: Project = {
      id: `p${Date.now()}`,
      name: projectData.name || '未命名项目',
      status: projectData.status || ProjectStatus.CREATED,
      type: projectData.type || ProjectType.ENGINEERING,
      lastUpdated: new Date(),
      deadline: projectData.deadline,
      openingDate: projectData.openingDate,
      region: projectData.region,
      progress: { credit: 'pending', technical: 'pending', economic: 'pending' }
    };
    
    set((state) => ({
      projects: [newProject, ...state.projects]
    }));
    
    return newProject;
  },

  // Notifications
  notifications: MOCK_NOTIFICATIONS,
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    )
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isRead: true }))
  })),

  // UI State
  isCreateModalOpen: false,
  setIsCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),
}));
