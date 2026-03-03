import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from './CalendarDay';
import { MOCK_EVENTS } from '../../constants';

interface CalendarGridProps {
    currentDate: Date;
    selectedDate: Date;
    view: 'month' | 'week';
    onNavigate: (dir: 'prev' | 'next') => void;
    onDateClick: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    currentDate,
    selectedDate,
    view,
    onNavigate,
    onDateClick
}) => {
    const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = new Date();

    const getCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const days: { date: Date; isCurrentMonth: boolean }[] = [];

        if (view === 'month') {
            const firstDayOfMonth = new Date(year, month, 1);
            const startingDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Start Mon

            // Previous month days
            const prevMonth = new Date(year, month, 0);
            for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                days.push({
                    date: new Date(year, month - 1, prevMonth.getDate() - i),
                    isCurrentMonth: false
                });
            }

            // Current month days
            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
            for (let i = 1; i <= lastDayOfMonth; i++) {
                days.push({ date: new Date(year, month, i), isCurrentMonth: true });
            }

            // Next month days to fill 42 cells (6 rows)
            const remaining = 42 - days.length;
            for (let i = 1; i <= remaining; i++) {
                days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
            }
        } else {
            // Week View
            const currentDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1; // 0=Mon
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDay);

            for (let i = 0; i < 7; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                days.push({ date: d, isCurrentMonth: d.getMonth() === month });
            }
        }

        return days;
    };

    const getEventsForDate = (date: Date) => {
        const norm = normalizeDate(date).getTime();
        return MOCK_EVENTS.filter(e => normalizeDate(e.date).getTime() === norm && !e.completed);
    };

    return (
        <div className="flex flex-col -mx-6">
            {/* Navigation Bar */}
            <div className="flex items-center justify-between px-4 py-1 mt-2">
                <button
                    onClick={() => onNavigate('prev')}
                    className="p-1.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand transition-colors"
                >
                    <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-bold text-text-primary tracking-wide">
                    {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                </span>
                <button
                    onClick={() => onNavigate('next')}
                    className="p-1.5 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand transition-colors"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="px-3">
                {/* Week Headers */}
                <div className="grid grid-cols-7 mb-2 mt-1">
                    {['一', '二', '三', '四', '五', '六', '日'].map(d => (
                        <div key={d} className="text-center text-xs font-medium text-text-tertiary/70">{d}</div>
                    ))}
                </div>

                {/* Days Grid - No borders, just gap */}
                <div className="grid grid-cols-7 gap-0">
                    {getCalendarDays().map((item, idx) => (
                        <CalendarDay
                            key={idx}
                            date={item.date}
                            isCurrentMonth={item.isCurrentMonth}
                            isToday={normalizeDate(item.date).getTime() === normalizeDate(today).getTime()}
                            isSelected={normalizeDate(item.date).getTime() === normalizeDate(selectedDate).getTime()}
                            events={getEventsForDate(item.date)}
                            onClick={onDateClick}
                            view={view}
                        />
                    ))}
                </div>
            </div>

            {/* Legend - Minimalist */}
            <div className="px-5 pb-3 pt-3 flex gap-4 justify-center border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-functional-error" />
                    <span className="text-[10px] text-text-tertiary">截止</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-[10px] text-text-tertiary">开标</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-functional-warning" />
                    <span className="text-[10px] text-text-tertiary">提醒</span>
                </div>
            </div>
        </div>
    );
};
