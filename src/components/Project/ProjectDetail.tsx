import React from 'react';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { Project } from '../../types';
import { Button } from '../ui/button';
import { ProjectInfoCard } from './ProjectInfoCard';
import { VersionList } from './VersionList';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="flex flex-col h-full w-full space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-text-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text-primary truncate">{project.name}</h1>
        <Button variant="secondary" size="sm" className="ml-auto">
          <Edit2 size={14} className="mr-1.5" /> 编辑项目
        </Button>
      </div>

      {/* 1. Project Basic Info */}
      <ProjectInfoCard project={project} />

      {/* 2. File Management */}
      <VersionList initialVersions={project.versions} />

      <div className="h-10"></div>
    </div>
  );
};