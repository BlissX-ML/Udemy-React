import PlayerInfo from './components/PlayerInfo'
import PlayContainer from './components/PlayContainer'
import Log from './components/Log'
import { grid } from './components/grid'
import { useState } from 'react'
import { winnerConditions } from './winnerConditions';
import GameOver from './components/GameOver'
import './App.css'


function deriveActivePlayer(turnGame) {
  let playingPlayer = '🦋';
  if (turnGame.length > 0 && turnGame[0].player === playingPlayer) { playingPlayer = '💛' }
  return playingPlayer;
}


// --- 获得棋盘（from PlayerContainer） ---
function getBoardContainer(rows, columns, turnGame) {
  const board = grid(rows, columns);  // 语义更清晰

  for (const turn of turnGame) {
    const { square, player } = turn;
    const { row, col } = square;

    board[row][col] = player
  }
  return board;
}


// 判断冠军是谁
function judgeWinner(rows, columns, playerChange, board) {
  const winners = winnerConditions(rows, columns);

  let currentWinner = null;

  for (let situation of winners) {
    let firstSituation = board[situation[0].row][situation[0].column]
    let secondSituation = board[situation[1].row][situation[1].column]
    let thirdSituation = board[situation[2].row][situation[2].column]

    if (firstSituation && firstSituation === secondSituation && firstSituation === thirdSituation) {
      currentWinner = playerChange[firstSituation]
    }
  }

  return currentWinner;
}


// 判断是否有冠军
function hasWinnerAfterGame(currentWinner, turnGame, rows, columns) {
  // turnGame.length === (rows * columns) 表示存储的点击情况已经填满棋盘大小了
  let hasWinner = !currentWinner && turnGame.length === (rows * columns)
  return hasWinner;
}




export default function App() {
  const [turnGame, setTurnGame] = useState([]);

  const [playerChange, setPlayerNameChange] = useState({
    '🦋': 'NingNing',
    '💛': 'BX',
  })

  // const [curPlayer, setCurPlayer] = useState('🦋');
  const activePlayer = deriveActivePlayer(turnGame);



  const x = 3;
  const y = 3;

  let board = getBoardContainer(x, y, turnGame);        // 获取棋盘
  let currentWinner = judgeWinner(x, y, playerChange, board);  // 判断赢得是谁
  let hasWinner = hasWinnerAfterGame(currentWinner, turnGame, x, y);    // 判断有没有人获胜



  // ---- 在玩家修改名字之后，保存玩家的名字 ----

  function handleChangePlayerName(mark, plaerName) {
    setPlayerNameChange(prev => ({
      ...prev,
      [mark]: plaerName
    }))
  }

  // -----

  // -----  初始化记录 turnGame 的数据 -----

  function handleInitial() {
    setTurnGame([])
  }

  // ------

  function handleSelectSquare(rowInd, columnInd) {
    // setCurPlayer((prev) => prev === '🦋' ? '💛' : '🦋');

    setTurnGame(turned => {
      // let playingPlayer = '🦋';

      // if (turned.length > 0 && turned[0].player === playingPlayer) {
      //   playingPlayer = '💛'
      // }

      const currentPlayer = deriveActivePlayer(turned);

      const updateTurnedGameArray = [
        { square: { row: rowInd, col: columnInd }, player: currentPlayer },
        ...turnGame,
      ]

      return updateTurnedGameArray
    })
  }

  return (
    <>
      <h1>React - Tic Tac Toe</h1>
      <main>
        <PlayerInfo initialName='NingNing' symbol='🦋' isActive={activePlayer === '🦋'} isChangedName={handleChangePlayerName} />
        <PlayerInfo initialName='BX' symbol='💛' isActive={activePlayer === '💛'} isChangedName={handleChangePlayerName} />
        <PlayContainer columns={y} onSelectPlayer={handleSelectSquare} turns={turnGame} board={board} />
        {currentWinner && `You WIN ${currentWinner}`}
      </main>
      <Log turns={turnGame} />
      {(hasWinner || currentWinner) && <GameOver win={currentWinner} initialize={handleInitial} />}
    </>
  )
}

