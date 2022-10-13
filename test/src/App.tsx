import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Board, BoardItem } from '../../core/src/components/Board'

function App() {
  return (
    <div className="App">
      <h1>Pegboard</h1>
      <Board gridSize={20} width={20} height={20}>
        <BoardItem maxHeight={20} maxWidth={20} minWidth={6} minHeight={2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 600,
              width: '100%',
              height: '100%',
            }}
          >
            Hello World!
          </div>
        </BoardItem>
      </Board>
    </div>
  )
}

export default App
