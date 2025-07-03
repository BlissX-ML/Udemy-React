

export default function PlayContainer({ columns, onSelectPlayer, board }) {
    // const board = grid(rows, columns);  // 语义更清晰

    // for (const turn of turns) {
    //     const { square, player } = turn;
    //     const { row, col } = square;

    //     board[row][col] = player
    // }

    // // 初始化当前的棋盘
    // const [gameBoardFill, setGameBoardFill] = useState(container);

    // // 通过点击事件更新棋盘
    // const handleSelectBoard = (row, column) => {
    //     setGameBoardFill(curBoard => {
    //         const updateBoard = [...curBoard.map(inner => [...inner])];
    //         updateBoard[row][column] = curPlayerSymbol;
    //         return updateBoard;
    //     })

    //     onSelectPlayer();
    // }

    return (

        <ul
            className="grid-container"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`
            }}
        >
            {
                board.map((row, rowInd) =>
                    <li key={rowInd}>
                        <ul>
                            {
                                // column 表示的是当前一维数组的每一个元素
                                row.map((column, columnInd) =>
                                    <li key={columnInd}>
                                        <button
                                            onClick={() => onSelectPlayer(rowInd, columnInd)}
                                            disabled={column !== null}
                                        // disabled={board[rowInd][columnInd]}
                                        >
                                            {column}
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </li>)
            }
        </ul>
    )
}
