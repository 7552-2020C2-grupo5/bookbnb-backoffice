export function getDateStringFrom(string) {
    //TODO Asegurarse que la fecha sea correcta
    const date = new Date(string);
    return date.toLocaleDateString('es-AR');
}

export function getISODateStringFrom(date) {
    if (date === null) {
        return "";
    }
    return date.toISOString().split("T")[0];
}