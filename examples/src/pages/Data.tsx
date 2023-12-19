import { useWindowSize } from '../hooks/useWindowSize'
import { Board } from 'react-pegboard/src/components/Board'

const GRID_SIZE = 45

// eslint-disable-next-line import/no-default-export
export default function Data() {
  const { width: pageWidth, height: pageHeight } = useWindowSize()

  if (pageWidth === undefined || pageHeight === undefined) {
    return null
  }

  const width = Math.floor((pageWidth / GRID_SIZE) * 0.75)
  const height = Math.floor((pageHeight / GRID_SIZE) * 0.7)

  return (
    <main className="layout-sidebar example-data">
      <aside className="prose">
        <h1 style={{ margin: 0 }}>Data Dashboard Example</h1>
        <p>
          This example uses listens to the window size and updates the board to
          fit the page.
        </p>
      </aside>
      <Board
        className="data-example"
        gridSize={GRID_SIZE}
        dimensions={{ width, height }}
      >
        <Board.Item defaultPosition={{ x: 1, y: 1 }}>Inner</Board.Item>
        <Board.Item defaultPosition={{ x: 7, y: 1 }}>Inner</Board.Item>
        <Board.Item defaultPosition={{ x: 1, y: 5 }}>Inner</Board.Item>
      </Board>
    </main>
  )
}
