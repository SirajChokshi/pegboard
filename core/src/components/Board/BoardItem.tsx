import React, {
  useState,
  useContext,
  MouseEventHandler,
  PropsWithChildren,
  MouseEvent,
} from 'react'

import { BoardContext } from './BoardOuter'

// TODO - schokshi: move to different file & rename
type resizable = 'horizontal' | 'vertical' | 'both' | 'none'

type dimensions = {
  width: number
  height: number
}
type position = {
  x: number
  y: number
}

interface BoardItemProps extends PropsWithChildren {
  resizable?: resizable
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  defaultPosition?: position
  defaultDimensions?: dimensions
}

export function BoardItem({
  children,
  maxWidth = 5,
  maxHeight = 3,
  minWidth = 2,
  minHeight = 2,
  resizable = 'both',
  defaultPosition = {
    x: 0,
    y: 0,
  },
  defaultDimensions = {
    width: 5,
    height: 3,
  },
}: BoardItemProps) {
  const [dimensions, setDimensions] = useState<dimensions>(defaultDimensions)
  const [position, setPosition] = useState<position>(defaultPosition)

  const { dimensions: boundaries } = useContext(BoardContext)

  const { width, height } = dimensions

  const { x, y } = position

  const [isResizing, setIsResizing] = React.useState(false)

  const item = React.useRef<HTMLDivElement>(null)

  const style = {
    '--x': x,
    '--y': y,
    '--width': width,
    '--height': height,
    userSelect: isResizing ? 'none' : 'auto',
  } as React.CSSProperties

  const canHorizontallyResize =
    resizable === 'horizontal' || resizable === 'both'
  const canVerticallyResize = resizable === 'vertical' || resizable === 'both'

  const handleResize = function (e: MouseEvent, resizable: resizable) {
    setIsResizing(true)

    const handle = e.target as HTMLDivElement

    switch (handle.dataset.boardItemHandle) {
      case 'x':
        document.body.style.cursor = 'ew-resize'
        break
      case 'y':
        document.body.style.cursor = 'ns-resize'
        break
      case 'xy':
        document.body.style.cursor = 'nwse-resize'
        break
      default:
        document.body.style.cursor = 'auto'
    }

    const initialDimensions = dimensions
    const startingMousePosition: position = {
      x: e.pageX,
      y: e.pageY,
    }

    function handleMouseMove(mouseMoveEvent: MouseEvent) {
      let newWidth: number, newHeight: number

      if (resizable === 'none') {
        return
      }

      if (resizable !== 'vertical') {
        newWidth = Math.round(
          (initialDimensions.width * 20 -
            startingMousePosition.x +
            mouseMoveEvent.pageX) /
            20,
        )

        if (newWidth < minWidth) {
          newWidth = minWidth
        } else if (newWidth > maxWidth) {
          newWidth = maxWidth
        } else if (newWidth > boundaries.width - position.x) {
          newWidth = boundaries.width - position.x
        }
      }

      if (resizable !== 'horizontal') {
        newHeight = Math.round(
          (initialDimensions.height * 20 -
            startingMousePosition.y +
            mouseMoveEvent.pageY) /
            20,
        )

        if (newHeight < minHeight) {
          newHeight = minHeight
        } else if (newHeight > maxHeight) {
          newHeight = maxHeight
        } else if (newHeight > boundaries.height - position.y) {
          newHeight = boundaries.height - position.y
        }
      }

      setDimensions((oldDimensions) => ({
        width: newWidth ?? oldDimensions.width,
        height: newHeight ?? oldDimensions.height,
      }))
    }

    function handleMouseUp() {
      document.body.removeEventListener('mousemove', handleMouseMove as any)
      document.body.style.cursor = 'auto'
      setIsResizing(false)
    }

    document.body.addEventListener('mousemove', handleMouseMove as any)
    document.body.addEventListener('mouseup', handleMouseUp, { once: true })
  }

  const handleMove = function (e: MouseEvent) {
    document.body.style.cursor = 'grabbing'

    const initialPosition = position
    const startingMousePosition: position = {
      x: e.pageX,
      y: e.pageY,
    }

    function handleMouseMove(mouseMoveEvent: MouseEvent) {
      let newX, newY

      newX = Math.round(
        (initialPosition.x * 20 -
          startingMousePosition.x +
          mouseMoveEvent.pageX) /
          20,
      )

      if (newX < 1) {
        newX = 0
      } else if (newX > boundaries.width - width) {
        newX = boundaries.width - width
      }

      newY = Math.round(
        (initialPosition.y * 20 -
          startingMousePosition.y +
          mouseMoveEvent.pageY) /
          20,
      )

      if (newY < 1) {
        newY = 0
      } else if (newY > boundaries.height - height - 1) {
        newY = boundaries.height - height
      }

      setPosition({
        x: newX,
        y: newY,
      })
    }

    function handleMouseUp() {
      document.body.removeEventListener('mousemove', handleMouseMove as any)
      document.body.style.cursor = 'auto'
      setIsResizing(false)
    }

    document.body.addEventListener('mousemove', handleMouseMove as any)
    document.body.addEventListener('mouseup', handleMouseUp, { once: true })
  } as unknown as MouseEventHandler<HTMLButtonElement>

  return (
    <div style={style} data-board-item ref={item}>
      {children}

      <button data-board-item-move onMouseDown={handleMove}>
        ::
      </button>

      {canHorizontallyResize && (
        <>
          <div data-board-item-handle="x" />
          <div
            data-board-item-handle="x"
            onMouseDown={(e: MouseEvent) => handleResize(e, 'horizontal')}
          />
        </>
      )}
      {canVerticallyResize && (
        <>
          <div
            data-board-item-handle="y"
            onMouseDown={(e: MouseEvent) => handleResize(e, 'vertical')}
          />
          <div data-board-item-handle="y" />
        </>
      )}
      {canHorizontallyResize && canVerticallyResize && (
        <div
          data-board-item-handle="xy"
          onMouseDown={(e: MouseEvent) => handleResize(e, 'both')}
        />
      )}
    </div>
  )
}
