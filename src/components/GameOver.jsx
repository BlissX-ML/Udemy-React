export default function GameOver({ win, initialize }) {
    return (
        <div className="gameover">
            <p>GAME OVER!</p>
            {win && <p>{win}</p>}
            {!win && <p>No Winner!</p>}
            <button onClick={initialize}>Once Again</button>
        </div>
    )
}