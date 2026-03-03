import React, { useState } from 'react';
import {
    Plus, ChevronDown, ChevronRight, MoreVertical,
    CheckCircle, AlertTriangle, Loader2, FileText, Eye, Trash2
} from 'lucide-react';
import { ProposalVersion, CheckStatus, ProjectFile } from '../../types';
import { Button } from '../ui/button';
import { AddVersionModal } from '../Modals/AddVersionModal';
import { formatDate, formatSize } from '../../utils/format';

interface VersionListProps {
    initialVersions?: ProposalVersion[];
}

export const VersionList: React.FC<VersionListProps> = ({ initialVersions }) => {
    const [versions, setVersions] = useState<ProposalVersion[]>(initialVersions || [
        {
            id: 'v1',
            name: '投标文件-1',
            remark: '第一次编写的版本',
            uploadTime: new Date('2026-02-03T14:20:00'),
            files: [
                { id: 'fv1_1', name: '资信标.pdf', size: 5200000, uploadTime: new Date('2026-02-03T14:20:00') },
                { id: 'fv1_2', name: '技术标.pdf', size: 8700000, uploadTime: new Date('2026-02-03T14:20:00') },
                { id: 'fv1_3', name: '经济标.xlsx', size: 2100000, uploadTime: new Date('2026-02-03T14:20:00') },
            ],
            checkStatus: {
                credit: { status: 'success', issueCount: 0 },
                technical: { status: 'warning', issueCount: 2 },
                economic: { status: 'pending', issueCount: 0 },
            }
        }
    ]);

    const [expandedVersions, setExpandedVersions] = useState<string[]>(['v1']);
    const [isAddVersionModalOpen, setIsAddVersionModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const toggleVersion = (id: string) => {
        setExpandedVersions(prev =>
            prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
        );
    };

    const handleImportVersions = (versionName: string, remark: string, files: File[]) => {
        // 1. Generate Name
        let finalName = versionName;
        let counter = 1;
        while (versions.some(v => v.name === finalName)) {
            finalName = `${versionName}-${counter}`;
            counter++;
        }

        // 2. Create File Objects
        const newFiles: ProjectFile[] = files.map(file => ({
            id: `f_${Date.now()}_${Math.random()}`,
            name: file.name,
            size: file.size,
            uploadTime: new Date()
        }));

        // 3. Create Version Object
        const newVersion: ProposalVersion = {
            id: `v_${Date.now()}_${Math.random()}`,
            name: finalName,
            remark: remark,
            uploadTime: new Date(),
            files: newFiles,
            checkStatus: {
                credit: { status: 'pending', issueCount: 0 },
                technical: { status: 'pending', issueCount: 0 },
                economic: { status: 'pending', issueCount: 0 },
            }
        };

        setVersions(prev => [newVersion, ...prev]);
        setExpandedVersions(prev => [newVersion.id, ...prev]);
        setIsAddVersionModalOpen(false);
    };

    const handleDeleteVersion = (id: string) => {
        if (confirm('确定要删除这个版本吗？此操作不可恢复。')) {
            setVersions(prev => prev.filter(v => v.id !== id));
            setActiveMenuId(null);
        }
    };

    const handleEditRemark = (id: string, currentRemark?: string) => {
        const newRemark = prompt('请输入新的备注：', currentRemark || '');
        if (newRemark !== null) {
            setVersions(prev => prev.map(v => v.id === id ? { ...v, remark: newRemark } : v));
        }
        setActiveMenuId(null);
    };

    const renderCheckBadge = (label: string, status: CheckStatus) => {
        const icons = {
            success: <CheckCircle size={14} className="text-functional-success" />,
            warning: <AlertTriangle size={14} className="text-functional-warning" />,
            processing: <Loader2 size={14} className="text-brand animate-spin" />,
            pending: <div className="w-3.5 h-3.5 rounded-full border border-gray-300" />
        };

        return (
            <div className="flex items-center gap-2 px-1" title={`${label}: ${status.status}`}>
                {icons[status.status]}
                <span className="text-xs text-text-tertiary">{label}</span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-text-primary">投标文件版本</h2>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                    onClick={() => setIsAddVersionModalOpen(true)}
                >
                    <Plus size={14} /> 添加版本
                </Button>
            </div>

            <div className="space-y-3">
                {versions.length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <p className="text-sm text-text-tertiary">暂无投标文件版本</p>
                        <p className="text-xs text-gray-400 mt-1">可以添加多个版本用于对比分析或保存历史记录</p>
                    </div>
                )}

                {versions.map((version) => {
                    const isExpanded = expandedVersions.includes(version.id);

                    return (
                        <div key={version.id} className="border border-[#D9DCDF] rounded-lg overflow-hidden transition-all duration-300">
                            {/* Header Row */}
                            <div
                                className={`bg-gray-50 px-4 py-3 flex items-center gap-4 justify-between cursor-pointer hover:bg-gray-100 transition-colors ${isExpanded ? 'border-b border-gray-200' : ''}`}
                                onClick={() => toggleVersion(version.id)}
                            >
                                {/* Group 1: Name + Remark + Date */}
                                <div className="flex-1 items-center gap-2 flex">
                                    <span className="text-sm font-bold text-text-primary pr-2">{version.name}</span>
                                    {version.remark && <span className="text-xs text-text-tertiary truncate max-w-[200px] border-l border-gray-300 pl-2">{version.remark}</span>}
                                    <span className="text-xs text-gray-400">{formatDate(version.uploadTime)}</span>
                                </div>

                                {/* Group 2: Status Summary */}
                                <div className="flex items-center gap-2 text-xs">
                                    {renderCheckBadge('资信', version.checkStatus.credit)}
                                    {renderCheckBadge('技术', version.checkStatus.technical)}
                                    {renderCheckBadge('经济', version.checkStatus.economic)}
                                </div>

                                {/* Group 3: Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="h-7 px-3 text-[11px]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Start check logic
                                        }}
                                    >
                                        开始检查
                                    </Button>

                                    <div className="relative">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-7 w-7 px-0 flex items-center justify-center"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveMenuId(activeMenuId === version.id ? null : version.id);
                                            }}
                                        >
                                            <MoreVertical size={16} />
                                        </Button>
                                        {activeMenuId === version.id && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }} />
                                                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-20 py-1">
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-xs text-text-secondary hover:bg-gray-50 hover:text-brand transition-colors"
                                                        onClick={(e) => { e.stopPropagation(); handleEditRemark(version.id, version.remark); }}
                                                    >
                                                        修改备注
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-xs text-functional-error hover:bg-red-50 transition-colors"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteVersion(version.id); }}
                                                    >
                                                        删除版本
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
                                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            {isExpanded && (
                                <div className="bg-white animate-in slide-in-from-top-2 duration-200">
                                    <div className="mb-0">
                                        {version.files.length > 0 ? (
                                            <div className="divide-y divide-gray-100 border-y border-gray-100">
                                                {version.files.map((file) => (
                                                    <div key={file.id} className="flex items-center justify-between px-4 py-2 bg-white group hover:bg-gray-50 transition-colors">
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <FileText size={14} className="text-text-tertiary shrink-0" />
                                                            <div className="grid grid-cols-[1fr_100px_150px] gap-4 items-center flex-1 min-w-0">
                                                                <span className="text-sm font-regular text-text-primary truncate" title={file.name}>{file.name}</span>
                                                                <span className="text-xs text-text-tertiary">{formatSize(file.size)}</span>
                                                                <span className="text-xs text-gray-400 hidden sm:inline-block">{formatDate(file.uploadTime)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4 shrink-0">
                                                            <button className="p-1 text-gray-400 hover:text-brand hover:bg-white rounded transition-colors" title="预览">
                                                                <Eye size={14} />
                                                            </button>
                                                            <button className="p-1 text-gray-400 hover:text-red-500 hover:bg-white rounded transition-colors" title="删除">
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 text-gray-400 text-sm border-y border-gray-100 bg-gray-50/30">
                                                该版本暂无文件
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <AddVersionModal
                isOpen={isAddVersionModalOpen}
                onClose={() => setIsAddVersionModalOpen(false)}
                onImport={handleImportVersions}
            />
        </div>
    );
};
