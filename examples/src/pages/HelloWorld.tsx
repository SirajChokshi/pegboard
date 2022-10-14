import { useState } from 'react'
import { Board } from 'pegboard-core/src/components/Board'

const DEFAULT_GRID_SIZE = 20
const DEFAULT_DIMENSIONS = {
  width: 20,
  height: 20,
}

// eslint-disable-next-line import/no-default-export
export default function HelloWorld() {
  const [dimensions, setDimensions] = useState(DEFAULT_DIMENSIONS)
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE)

  return (
    <>
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
    </>
  )
}
