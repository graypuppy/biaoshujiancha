import React, { useState } from 'react';
import { X, CheckSquare } from 'lucide-react';
import { CalendarGrid } from './CalendarGrid';
import { TodoList } from './TodoList';
import { MOCK_EVENTS } from '../../constants';
import { EventType } from '../../types';

export const TenderCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week'>('week');
  const [modalOpen, setModalOpen] = useState(false);

  // Normalize date to remove time for comparison
  const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const getEventsForDate = (date: Date) => {
    const norm = normalizeDate(date).getTime();
    return MOCK_EVENTS.filter(e => normalizeDate(e.date).getTime() === norm && !e.completed);
  };

  const selectedEvents = getEventsForDate(selectedDate).sort((a, b) => a.date.getTime() - b.date.getTime());
  const today = new Date();
  const isSelectedToday = normalizeDate(selectedDate).getTime() === normalizeDate(today).getTime();
  const todoHeader = isSelectedToday ? '今日待办' : `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 待办`;

  const navigate = (dir: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (dir === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (dir === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] px-6 pt-4 pb-6 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary">投标日历</h2>
        <div className="flex bg-gray-100/80 p-1 rounded-lg h-8 items-center border border-gray-200/50">
          <button
            onClick={() => setView('month')}
            className={`flex-1 px-4 h-full text-xs font-medium rounded-md transition-all duration-200 ${view === 'month' ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'
              }`}
          >
            月
          </button>
          <button
            onClick={() => setView('week')}
            className={`flex-1 px-4 h-full text-xs font-medium rounded-md transition-all duration-200 ${view === 'week' ? 'bg-white text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-secondary'
              }`}
          >
            周
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-gray-200 -mx-6 shrink-0" />

      <CalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        view={view}
        onNavigate={navigate}
        onDateClick={setSelectedDate}
      />

      <TodoList
        todoHeader={todoHeader}
        todoList={selectedEvents}
        onReturnToToday={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }}
        onItemClick={() => setModalOpen(true)}
      />

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-text-primary text-sm">
                {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 事项
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto space-y-3">
              {selectedEvents.map(event => (
                <div key={event.id} className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${event.type === EventType.DEADLINE ? 'bg-functional-error' :
                      event.type === EventType.OPENING ? 'bg-brand' : 'bg-functional-warning'
                      }`} />
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-text-primary leading-snug mb-1">{event.projectName}</h5>
                      <p className="text-xs text-text-tertiary mb-2">截止时间: {event.timeStr}</p>
                      <button className="text-xs flex items-center justify-center w-full py-1.5 gap-1 text-brand bg-brand/5 hover:bg-brand/10 rounded font-medium transition-colors">
                        <CheckSquare size={12} /> 标记完成
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};