export const formatDateCategory = (dateString: string) => {
    const date = new Date(dateString);

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${monthList[date.getMonth()]} ${date.getFullYear()}`;
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return `${weekList[date.getDay()]} ${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
}