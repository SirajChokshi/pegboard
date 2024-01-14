import { useEffect, useState } from 'react'
import { Board } from 'react-pegboard/src/components/Board'

const DEFAULT_GRID_SIZE = 40
const DEFAULT_DIMENSIONS = {
  width: 20,
  height: 20,
}

function getCellWidthFromScreenWidth(screenWidth: number) {
  if (screenWidth < 500) {
    return 15
  }

  if (screenWidth < 800) {
    return 30
  }

  if (screenWidth < 1200) {
    return 40
  }

  return 50
}

// eslint-disable-next-line import/no-default-export
export default function HelloWorld() {
  const [dimensions, setDimensions] = useState(DEFAULT_DIMENSIONS)
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE)

  useEffect(() => {
    const handleResize = () => {
      let screenWidth = window.innerWidth - 26
      const screenHeight = window.innerHeight - 26

      if (screenWidth > 740) {
        screenWidth -= 200
      }

      const newGridSize = getCellWidthFromScreenWidth(screenWidth)

      const width = Math.floor(screenWidth / newGridSize)
      const height = Math.floor(screenHeight / newGridSize)

      setDimensions({ width, height })
      setGridSize(newGridSize)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main className="layout-sidebar">
      <aside>
        <fieldset
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <legend>Config</legend>

          <label>
            Grid Size
            <input
              type="number"
              value={gridSize}
              min={1}
              max={50}
              onChange={(e) => setGridSize(Number(e.target.value))}
            />
          </label>

          <label>
            Width
            <input
              type="number"
              value={dimensions.width}
              min={1}
              max={50}
              onChange={(e) =>
                setDimensions({ ...dimensions, width: Number(e.target.value) })
              }
            />
          </label>

          <label>
            Height
            <input
              type="number"
              value={dimensions.height}
              min={1}
              max={50}
              onChange={(e) =>
                setDimensions({ ...dimensions, height: Number(e.target.value) })
              }
            />
          </label>
        </fieldset>
      </aside>

      <div className="layout-main">
        <Board gridSize={gridSize} dimensions={dimensions}>
          <Board.Item maxHeight={20} maxWidth={20} minWidth={6} minHeight={2}>
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
          </Board.Item>
        </Board>
      </div>
    </main>
  )
}
