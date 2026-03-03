import React from 'react';
import { Calendar, Clock, FileText, CheckCircle, Download, RefreshCw, UploadCloud } from 'lucide-react';
import { Project, ProjectFile, ProjectStatus } from '../../types';
import { formatDate, formatSize } from '../../utils/format';
import { getStatusColorClass } from '../../utils/status';

interface ProjectInfoCardProps {
    project: Project;
}

interface InfoFieldProps {
    label: string;
    children: React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, children }) => (
    <div>
        <label className="text-xs text-text-tertiary mb-1 block">{label}</label>
        <div className="text-sm font-medium text-text-primary">{children}</div>
    </div>
);

interface TenderFileCardProps {
    file?: ProjectFile;
    typeLabel: string;
    icon: React.ReactNode;
    onUpload?: () => void;
}

const TenderFileCard: React.FC<TenderFileCardProps> = ({ file, typeLabel, icon, onUpload }) => {
    if (!file) {
        return (
            <div
                onClick={onUpload}
                className="border border-dashed border-gray-200 rounded-lg p-3 flex items-center justify-center cursor-pointer hover:border-brand hover:bg-brand/5 transition-all group"
            >
                <div className="flex items-center gap-2 text-gray-400 group-hover:text-brand">
                    <UploadCloud size={14} />
                    <span className="text-xs">上传{typeLabel}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between group hover:border-brand/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm shrink-0 ${typeLabel === '招标文件' ? 'text-brand' : 'text-green-600'}`}>
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-text-primary truncate" title={file.name}>{file.name}</span>
                        {typeLabel === '招标文件' && <CheckCircle size={12} className="text-functional-success shrink-0" />}
                    </div>
                    <div className="text-[10px] text-text-tertiary mt-0.5">
                        {typeLabel} • {formatSize(file.size)}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <button className="p-1.5 text-gray-500 hover:text-brand hover:bg-white rounded transition-colors" title="下载"><Download size={14} /></button>
                <button className="p-1.5 text-gray-500 hover:text-brand hover:bg-white rounded transition-colors" title="替换"><RefreshCw size={14} /></button>
            </div>
        </div>
    );
};

export const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ project }) => {
    const getDaysRemaining = (deadline?: Date) => {
        if (!deadline) return null;
        const diff = deadline.getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        return days;
    };

    const daysRemaining = getDaysRemaining(project.deadline);
    const isUrgent = daysRemaining !== null && daysRemaining <= 3 && daysRemaining >= 0;

    const getStatusBadge = (status: ProjectStatus) => {
        return (
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColorClass(status)}`}>
                {status}
            </span>
        );
    };

    // Mock Data Injection if not present
    const tenderFile = project.tenderFile || {
        id: 'f1', name: 'XX市政道路改造工程招标文件.pdf', size: 12500000, uploadTime: new Date('2026-02-03T10:35:00')
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-text-primary">项目基本信息</h2>
                {getStatusBadge(project.status)}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8">
                <InfoField label="项目编号">
                    {project.id.toUpperCase()}
                </InfoField>

                <InfoField label="投标截止">
                    <div className={`flex items-center gap-2 ${isUrgent ? 'text-functional-error' : ''}`}>
                        <Clock size={14} />
                        {formatDate(project.deadline)}
                        {daysRemaining !== null && daysRemaining >= 0 && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${isUrgent ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-text-secondary'}`}>
                                剩 {daysRemaining} 天
                            </span>
                        )}
                    </div>
                </InfoField>

                <InfoField label="开标时间">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gray-400" />
                        {formatDate(project.openingDate)}
                    </div>
                </InfoField>

                <InfoField label="创建时间">
                    <span className="text-text-secondary font-normal">2026-02-03 10:30</span>
                </InfoField>
            </div>

            {/* Tender Related Files */}
            <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-text-secondary mb-4">招标相关文件</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TenderFileCard
                        file={tenderFile}
                        typeLabel="招标文件"
                        icon={<FileText size={18} />}
                    />
                    <TenderFileCard
                        file={project.controlFile}
                        typeLabel="控制价文件"
                        icon={<FileText size={18} />}
                    />
                </div>
            </div>
        </div>
    );
};
