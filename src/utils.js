export function getDateStringFrom(string) {
    const date = new Date(string);
    return date.toLocaleDateString('es-AR');
}