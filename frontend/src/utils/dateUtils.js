import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatDate = (date) => {
    const dateObj = new Date(date);

    if (isToday(dateObj)) {
        return 'Today';
    }

    if (isYesterday(dateObj)) {
        return 'Yesterday';
    }

    return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
    return format(new Date(date), 'MMM dd, yyyy • hh:mm a');
};

export const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatFullDate = (date) => {
    return format(new Date(date), 'EEEE, MMMM dd, yyyy');
};
