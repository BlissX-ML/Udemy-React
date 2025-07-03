export function grid(rows, columns) {
    return Array.from({ length: rows }, () => new Array(columns).fill(null));
}