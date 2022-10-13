import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Board, BoardItem } from '../../core/src/components/Board'

function App() {
  const [count, setCount] = useState(0)
  console.log(Board)

  return (
    <div className="App">
      <h1>Pegboard</h1>
      <Board gridSize={20}>
        <BoardItem maxHeight={20} maxWidth={16}>
          <img src={reactLogo} alt="React Logo" />
        </BoardItem>
      </Board>
    </div>
  )
}

export default App
