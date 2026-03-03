import React from 'react';
import { CalendarEvent, EventType } from '../../types';

interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  onClick?: (date: Date) => void;
  view?: 'month' | 'week';
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ date, events, isCurrentMonth, isToday, isSelected, onClick, view = 'month' }) => {
  const getEventColor = (type: EventType) => {
    switch (type) {
      case EventType.DEADLINE: return 'bg-functional-error';
      case EventType.OPENING: return 'bg-brand';
      case EventType.REMINDER: return 'bg-functional-warning';
      default: return 'bg-gray-500';
    }
  };

  // 周视图使用更大的高度
  const containerHeight = view === 'week' ? 'min-h-12' : 'min-h-12';

  // 日期数字样式：今天 > 选中 > 当月 > 非当月
  const getDateStyle = () => {
    if (isToday && !isSelected) return 'text-brand bg-brand/10 font-bold';
    if (isSelected) return 'bg-brand text-white font-bold shadow-sm';
    if (!isCurrentMonth) return 'text-gray-300';
    return 'text-text-primary group-hover:text-brand';
  };

  return (
    <div
      onClick={() => onClick?.(date)}
      className={`${containerHeight} p-1.5 transition-colors cursor-pointer group rounded-md ${isSelected && !isToday ? 'bg-brand-light/30' : ''
        } ${!isCurrentMonth ? 'opacity-60' : ''} hover:bg-gray-50`}
    >
      <div className="flex justify-center items-start mb-1 mt-0.5">
        <span className={`text-xs w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200 ${getDateStyle()}`}>
          {date.getDate()}
        </span>
      </div>

      {/* 仅展示水平排列的圆点，不显示文字 */}
      {events.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 px-1">
          {events.slice(0, 4).map((event) => (
            <div
              key={event.id}
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${getEventColor(event.type)} ${event.completed ? 'opacity-30' : ''}`}
              title={`${event.timeStr} - ${event.projectName}`}
            />
          ))}
          {events.length > 4 && (
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" title={`共 ${events.length} 个事项`} />
          )}
        </div>
      )}
    </div>
  );
};
