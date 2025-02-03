export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
};

export const getWeekendsBetweenDates = (startDate: string, endDate: string): string[] => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const weekends: string[] = [];

    startDateObj.setDate(startDateObj.getDate() + 1);
    endDateObj.setDate(endDateObj.getDate() + 1);

    for (let date = new Date(startDateObj); date <= endDateObj; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends.push(formatDate(date));
        }
    }
    return weekends;
};
