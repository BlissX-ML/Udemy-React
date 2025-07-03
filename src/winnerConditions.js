export function winnerConditions(rows, columns) {
    let lines = [];

    // 横向正确的情况，也就是 row = 0, column = 0~2
    for (let r = 0; r < rows; r++) {
        lines.push(
            Array.from({ length: columns }, (_, c) => ({ row: r, column: c }))
        )
    }

    // 竖向正确的情况，也就是 column = 0, row = 0~2
    for (let c = 0; c < columns; c++) {
        lines.push(
            Array.from({ length: rows }, (_, r) => ({ row: r, column: c }))
        )
    }


    if (rows === columns) {
        // 斜向右下角的情况
        lines.push(
            Array.from({ length: rows }, (_, i) => ({ row: i, column: i }))
        )

        // 斜向左下角的情况
        lines.push(
            Array.from({ length: rows }, (_, i) => ({ row: i, column: rows - 1 - i }))
        )
    }

    return lines
}
