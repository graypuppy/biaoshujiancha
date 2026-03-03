import { ProjectStatus } from '../types';

export const getStatusColorClass = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.IN_PROGRESS:
        case ProjectStatus.OPENED:
            return 'bg-brand-light text-brand';
        case ProjectStatus.CHECKING:
            return 'bg-functional-warning/10 text-functional-warning';
        case ProjectStatus.SUBMITTED:
        case ProjectStatus.WON:
            return 'bg-functional-success/10 text-functional-success';
        case ProjectStatus.LOST:
            return 'bg-functional-error/10 text-functional-error';
        case ProjectStatus.CREATED:
        default:
            return 'bg-gray-100 text-gray-600';
    }
};
