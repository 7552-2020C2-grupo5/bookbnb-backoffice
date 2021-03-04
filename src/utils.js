export function formatUTCDateString(string) {
    //TODO Asegurarse que la fecha sea correcta
    const date = new Date(string);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    return `${day}/${month}/${year}`
}

export function formatDateToISODateString(date) {
    if (date === null) {
        return "";
    }
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const monthString = month >= 10 ? month.toString() : `0${month}`;
    const dayString = day >= 10 ? day.toString() : `0${day}`;

    return `${year}-${monthString}-${dayString}`
}


