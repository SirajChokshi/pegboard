import { useWindowSize } from '../hooks/useWindowSize'
import { Board } from 'pegboard-core/src/components/Board'

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
    <>
      <Board
        className="data-example"
        gridSize={GRID_SIZE}
        dimensions={{ width, height }}
      >
        <Board.Item>Inner</Board.Item>
        <Board.Item>Inner</Board.Item>
        <Board.Item>Inner</Board.Item>
      </Board>
    </>
  )
}
