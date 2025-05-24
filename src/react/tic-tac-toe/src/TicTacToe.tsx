import { useState } from "react"
import './TicTacToe.css'

interface TicTacToeProps {
  matrix_size: number;
}

export const TicTacToe = ({matrix_size}: TicTacToeProps) => {
  const createEmptyMatrix = (matrix_size: number) => Array.from(
    {length: matrix_size}, 
    () => Array(matrix_size).fill(' ')
)
  const [isXTurn, setIsXTurn] = useState(true)
  const [matrix, setMatrix] = useState(createEmptyMatrix(matrix_size))


  const updateMatrix = (i: number, j: number) => {
    if (winner) return
    if (matrix[i][j] !== ' ') return
    const result = matrix.map((m, n) => {
        if (n === i) {
          let copyM = [...m]
          copyM[j] = isXTurn ? 'X' : 'O'
          return copyM
        }
        return m
    })
    setMatrix(result)
    setIsXTurn(prev => !prev)
  }

  const flat = matrix.flat();
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const candidate = line.map(i => flat[i]).join('')
      if (candidate === 'XXX') return ['X wins!', line]
      if (candidate === 'OOO') return ['O wins!', line]
    }
    return [undefined, undefined]
  }

  const [winner, line] = checkWinner() as [string | undefined, number[] | undefined]

  const winningStyle = (pos: number) => winner && line && line.includes(pos) ?  
          {backgroundColor: 'lightblue'} : 
          {}
    function restartGame(): void {
        setMatrix(createEmptyMatrix(matrix_size))
        setIsXTurn(true)
    }

  return (
    <div className="tic-tac-toe-root">
      <div className="matrix">
        {!winner && isXTurn && 'Player X:'}
        {!winner && !isXTurn && 'Player O:'}
        {winner && <div>{winner}</div>}
        {matrix.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cell, j) => (
              <button key={j} onClick={() => {updateMatrix(i,j)}} className="cell"
                style={winningStyle(i*matrix.length+j)}
              >
              {cell} 
              </button> 
          ))}
          </div>
        ))}
        {winner && <button className="restart-button" onClick={()=>restartGame()}>Restart</button>}
      </div>
    </div>
  )
}