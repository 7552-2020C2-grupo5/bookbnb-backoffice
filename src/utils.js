export function getDateStringFrom(string) {
    debugger;
    const date = new Date(string);
    return date.toLocaleDateString('es-AR');
}

export function getISODateStringFrom(date) {
    return date.toISOString().split("T")[0];
}