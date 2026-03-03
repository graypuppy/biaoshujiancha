import { Project, ProjectStatus, ProjectType, CalendarEvent, EventType, User, Notification, NotificationType } from './types';

// Helper to get dates relative to today
const getRelativeDate = (days: number, hours: number = 9, minutes: number = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: '项目截止提醒',
    content: '“上海市浦东新区金融中心二期总承包工程”投标截止时间仅剩2天，请尽快完善标书。',
    timestamp: getRelativeDate(0, 9, 0),
    isRead: false,
    type: NotificationType.REMINDER,
    projectId: 'p1'
  },
  {
    id: 'n2',
    title: '标书检查完成',
    content: '“深圳市轨道交通13号线土建工程”的技术标检查已完成，发现3处潜在风险点。',
    timestamp: getRelativeDate(-1, 15, 30),
    isRead: true,
    type: NotificationType.SUCCESS,
    projectId: 'p2'
  },
  {
    id: 'n3',
    title: '系统更新通知',
    content: 'TenderCheck Pro 已更新至 v1.2.0，新增了“智能资信核验”功能，欢迎体验。',
    timestamp: getRelativeDate(-2, 10, 0),
    isRead: false,
    type: NotificationType.SYSTEM
  },
  {
    id: 'n4',
    title: '开标结果更新',
    content: '“广州白云机场三期扩建工程”已进入开标阶段，请关注后续结果。',
    timestamp: getRelativeDate(-3, 11, 0),
    isRead: false,
    type: NotificationType.PROJECT,
    projectId: 'p4'
  }
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: '张建国',
  avatar: 'https://picsum.photos/100/100',
  company: '中建八局第三建设有限公司'
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: '上海市浦东新区金融中心二期总承包工程',
    status: ProjectStatus.IN_PROGRESS,
    type: ProjectType.ENGINEERING,
    lastUpdated: getRelativeDate(0, 10, 30),
    deadline: getRelativeDate(2, 17, 0),
    openingDate: getRelativeDate(5, 9, 30),
    progress: { credit: 'success', technical: 'warning', economic: 'pending' }
  },
  {
    id: 'p2',
    name: '深圳市轨道交通13号线土建工程',
    status: ProjectStatus.CHECKING,
    type: ProjectType.ENGINEERING,
    lastUpdated: getRelativeDate(-1, 14, 20),
    deadline: getRelativeDate(10),
    progress: { credit: 'success', technical: 'success', economic: 'warning' }
  },
  {
    id: 'p3',
    name: '杭州西站枢纽配套设施建设项目',
    status: ProjectStatus.CREATED,
    type: ProjectType.GOODS,
    lastUpdated: getRelativeDate(-2, 9, 0),
    deadline: getRelativeDate(15),
    progress: { credit: 'pending', technical: 'pending', economic: 'pending' }
  },
  {
    id: 'p4',
    name: '广州白云机场三期扩建工程',
    status: ProjectStatus.SUBMITTED,
    type: ProjectType.SERVICES,
    lastUpdated: getRelativeDate(-5),
    deadline: getRelativeDate(-2), // Passed
    openingDate: getRelativeDate(1, 10, 0),
    progress: { credit: 'success', technical: 'success', economic: 'success' }
  },
  {
    id: 'p5',
    name: '成都市天府新区智慧城市基础设施项目',
    status: ProjectStatus.OPENED,
    type: ProjectType.ENGINEERING,
    lastUpdated: getRelativeDate(-10),
    deadline: getRelativeDate(-12),
    openingDate: getRelativeDate(-8),
    progress: { credit: 'success', technical: 'success', economic: 'success' }
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    projectId: 'p1',
    projectName: '上海市浦东新区金融中心二期总承包工程',
    date: getRelativeDate(2),
    type: EventType.DEADLINE,
    completed: false,
    timeStr: '17:00'
  },
  {
    id: 'e2',
    projectId: 'p1',
    projectName: '上海市浦东新区金融中心二期总承包工程',
    date: getRelativeDate(5),
    type: EventType.OPENING,
    completed: false,
    timeStr: '09:30'
  },
  {
    id: 'e3',
    projectId: 'p4',
    projectName: '广州白云机场三期扩建工程',
    date: getRelativeDate(1),
    type: EventType.OPENING,
    completed: false,
    timeStr: '10:00'
  },
  {
    id: 'e4',
    projectId: 'p2',
    projectName: '深圳市轨道交通13号线土建工程 - 内部评审',
    date: getRelativeDate(0), // Today
    type: EventType.REMINDER,
    completed: false,
    timeStr: '14:00'
  },
  {
    id: 'e5',
    projectId: 'p1',
    projectName: '上海市浦东新区金融中心二期总承包工程 - 资信检查',
    date: getRelativeDate(0), // Today
    type: EventType.DEADLINE,
    completed: false,
    timeStr: '16:00'
  },
  {
    id: 'e6',
    projectId: 'p3',
    projectName: '杭州西站枢纽配套设施建设项目 - 技术方案讨论',
    date: getRelativeDate(0), // Today
    type: EventType.OPENING,
    completed: false,
    timeStr: '10:30'
  }
];