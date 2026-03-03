import React, { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { CreateProjectModal } from './components/Modals/CreateProjectModal';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { useStore } from './store/useStore';

const AppContent: React.FC = () => {
  const {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isCreateModalOpen,
    setIsCreateModalOpen,
    addProject
  } = useStore();

  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when route changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  const handleCreateProject = (newProjectData: any) => {
    const newProject = addProject(newProjectData);
    setIsCreateModalOpen(false);
    navigate(`/projects/${newProject.id}`);
  };

  const isDashboard = location.pathname === '/';
  const currentPath = location.pathname.startsWith('/projects') ? 'projects' : 'home';

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] text-[#1A1C24] overflow-hidden selection:bg-brand-light selection:text-brand-dark font-sans">
      {/* 1. Global Navigation */}
      <Sidebar
        currentPath={currentPath}
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* 2. User Status & Header */}
        <Header />

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className={`flex-1 overflow-y-auto scroll-smooth ${isDashboard ? 'p-4 sm:p-6 lg:p-6' : 'px-4 py-4'}`}>
          <div className={`${isDashboard ? 'max-w-7xl mx-auto' : 'w-full'} space-y-6`}>

            <Routes>
              <Route
                path="/"
                element={<DashboardPage />}
              />
              <Route
                path="/projects/:id"
                element={<ProjectDetailPage />}
              />
            </Routes>

          </div>

          {/* Footer Padding */}
          <div className="h-10"></div>
        </div>
      </main>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;