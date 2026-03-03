export enum ProjectStatus {
  CREATED = '已创建',
  IN_PROGRESS = '标书制作中',
  CHECKING = '检查中',
  SUBMITTED = '已提交',
  OPENED = '已开标',
  WON = '已中标',
  LOST = '未中标'
}

export enum ProjectType {
  ENGINEERING = '工程类',
  GOODS = '货物类',
  SERVICES = '服务类'
}

export enum EventType {
  DEADLINE = 'DEADLINE',
  OPENING = 'OPENING',
  REMINDER = 'REMINDER'
}

export interface CalendarEvent {
  id: string;
  projectId: string;
  projectName: string;
  date: Date; // Keep as Date object for easier comparison
  type: EventType;
  completed: boolean;
  timeStr: string; // e.g., "17:00"
}

export interface CheckProgress {
  credit: 'success' | 'warning' | 'pending';
  technical: 'success' | 'warning' | 'pending';
  economic: 'success' | 'warning' | 'pending';
}

export interface ProjectFile {
  id: string;
  name: string;
  size: number; // bytes
  uploadTime: Date;
  url?: string;
}

export interface CheckStatus {
  status: 'pending' | 'processing' | 'success' | 'warning' | 'error';
  issueCount: number;
}

export interface ProposalVersion {
  id: string;
  name: string; // e.g., "投标文件-1"
  remark?: string;
  uploadTime: Date;
  files: ProjectFile[];
  checkStatus: {
    credit: CheckStatus;
    technical: CheckStatus;
    economic: CheckStatus;
  };
}

export interface Project {
  id: string;
  name: string;
  region?: string; // Added region field
  status: ProjectStatus;
  type: ProjectType;
  lastUpdated: Date;
  deadline?: Date;
  openingDate?: Date;
  progress: CheckProgress;
  // Extended details
  tenderFile?: ProjectFile;
  controlFile?: ProjectFile;
  versions?: ProposalVersion[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  company: string;
}

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  PROJECT = 'PROJECT',
  REMINDER = 'REMINDER',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING'
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: NotificationType;
  projectId?: string;
}
