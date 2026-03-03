import React from 'react';
import { CheckSquare } from 'lucide-react';
import { CalendarEvent, EventType } from '../../types';

interface TodoListProps {
    todoHeader: string;
    todoList: CalendarEvent[];
    onReturnToToday: () => void;
    onItemClick: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
    todoHeader,
    todoList,
    onReturnToToday,
    onItemClick
}) => {
    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="flex items-center justify-between my-3">
                <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">{todoHeader}</h4>
                <button
                    onClick={onReturnToToday}
                    className="text-xs text-brand hover:underline"
                >
                    回到今天
                </button>
            </div>

            <div className="space-y-2.5">
                {todoList.length > 0 ? (
                    todoList.map(event => (
                        <div
                            key={event.id}
                            onClick={onItemClick}
                            className="group bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${event.type === EventType.DEADLINE ? 'bg-functional-error' :
                                event.type === EventType.OPENING ? 'bg-brand' : 'bg-functional-warning'
                                }`} />
                            <div className="pl-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-text-primary">
                                        {event.date.getMonth() + 1}月{event.date.getDate()}日 <span className="text-gray-400 font-normal ml-1">{event.timeStr}</span>
                                    </span>
                                </div>
                                <p className="text-xs text-text-secondary truncate group-hover:text-brand transition-colors" title={event.projectName}>
                                    {event.projectName}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                            <CheckSquare size={14} className="opacity-50" />
                        </div>
                        <span className="text-xs">近期无待办事项</span>
                    </div>
                )}
            </div>
        </div>
    );
};
