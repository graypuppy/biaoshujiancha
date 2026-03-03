import React from 'react';
import { Clock, Calendar, RefreshCw, CheckCircle2, AlertCircle, Clock3 } from 'lucide-react';
import { Project } from '../../types';
import { formatDate, formatTime } from '../../utils/format';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getProgressIcon = (status: 'success' | 'warning' | 'pending') => {
    switch (status) {
      case 'success': return <CheckCircle2 size={16} className="text-functional-success" />;
      case 'warning': return <AlertCircle size={16} className="text-functional-warning" />;
      case 'pending': return <Clock3 size={16} className="text-gray-400" />;
    }
  };

  // 决定显示投标截止还是开标时间（优先未过期的投标截止）
  let targetDate = project.deadline;
  let dateLabel = '投标截止';
  let Icon = Clock;

  const now = new Date();
  if (!targetDate || (project.openingDate && now > targetDate)) {
    targetDate = project.openingDate;
    dateLabel = '开标时间';
    Icon = Calendar;
  }

  // 计算剩余天数，用于高亮显示
  const getDaysRemaining = (date?: Date) => {
    if (!date) return null;
    const diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const daysRemaining = getDaysRemaining(targetDate);
  const isUrgent = daysRemaining !== null && daysRemaining <= 3 && daysRemaining >= 0;

  return (
    <div
      onClick={() => onClick(project)}
      className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-base text-gray-900 group-hover:text-brand transition-colors line-clamp-1 pr-4">
          {project.name}
        </h3>
      </div>

      <div className="flex items-center justify-between mb-3">
        {/* 左侧：最近更新 */}
        <div className="flex items-center text-gray-400 text-sm">
          <RefreshCw size={12} className="mr-1 shrink-0" />
          <span>更新: {formatTime(project.lastUpdated)}</span>
        </div>
        {/* 右侧：核心时间节点 */}
        <div className="flex items-center text-sm">
          <Icon size={16} className={`mr-1.5 shrink-0 ${isUrgent ? 'text-red-600' : 'text-gray-400'}`} />
          <span className={`${isUrgent ? 'text-red-600 font-regular' : 'text-gray-500'} mr-2`}>
            {dateLabel}:
          </span>
          <span className={`font-regular ${isUrgent ? 'text-red-600' : 'text-gray-500'}`}>
            {formatDate(targetDate)}
          </span>
          {isUrgent && (
            <span className="ml-2 px-1.5 py-0.5 bg-red-50 text-red-600 text-xs rounded font-bold">
              剩 {daysRemaining} 天
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-regular text-gray-500">检查进度</span>
        <div className="flex space-x-5">
          <div className="flex items-center" title="资信标">
            <span className="text-sm mr-1.5 text-gray-500 uppercase tracking-wider font-regular">资信</span>
            {getProgressIcon(project.progress.credit)}
          </div>
          <div className="flex items-center" title="技术标">
            <span className="text-sm mr-1.5 text-gray-500 uppercase tracking-wider font-regular">技术</span>
            {getProgressIcon(project.progress.technical)}
          </div>
          <div className="flex items-center" title="经济标">
            <span className="text-sm mr-1.5 text-gray-500 uppercase tracking-wider font-regular">经济</span>
            {getProgressIcon(project.progress.economic)}
          </div>
        </div>
      </div>
    </div>
  );
};
