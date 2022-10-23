import React, {
  useState,
  useContext,
  MouseEventHandler,
  PropsWithChildren,
  MouseEvent,
  CSSProperties,
  useEffect,
} from 'react'

import { BoardContext } from './BoardOuter'

import { resizable, position, dimensions, direction } from '../../types/board'
import { Handle } from './Handle'
import { DIRECTION_TO_RESIZABLE } from '../../utils/maps'

interface BoardItemProps extends PropsWithChildren {
  resizable?: resizable
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  defaultPosition?: position
  defaultDimensions?: dimensions
  liveResize?: boolean
  livePosition?: boolean
  className?: string
}

export function BoardItem({
  children,
  maxWidth = Number.MAX_SAFE_INTEGER,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minWidth = 2,
  minHeight = 2,
  resizable = 'both',
  liveResize = false,
  livePosition = false,
  defaultPosition = {
    x: 0,
    y: 0,
  },
  defaultDimensions = {
    width: 5,
    height: 3,
  },
  className,
}: BoardItemProps) {
  const [dimensions, setDimensions] = useState<dimensions>(defaultDimensions)
  const [nextDimensions, setNextDimensions] =
    useState<dimensions>(defaultDimensions)

  const [position, setPosition] = useState<position>(defaultPosition)
  const [nextPosition, setNextPosition] = useState<position>(defaultPosition)

  const { dimensions: boundaries, gridSize } = useContext(BoardContext)

  const { width, height } = dimensions
  const { x, y } = position

  const [isResizing, setIsResizing] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)

  const isInteracting = isResizing || isDragging

  const item = React.useRef<HTMLDivElement>(null)

  const style = {
    '--x': x,
    '--y': y,
    '--width': width,
    '--height': height,
    userSelect: isResizing ? 'none' : 'auto',
  } as CSSProperties

  const canHorizontallyResize =
    resizable === 'horizontal' || resizable === 'both'
  const canVerticallyResize = resizable === 'vertical' || resizable === 'both'

  const handleResize = function (e: MouseEvent, direction: direction) {
    // Disallow simultaneous dragging and resizing
    if (isDragging) {
      return
    }
    setIsResizing(true)

    const resizable = DIRECTION_TO_RESIZABLE[direction]

    const handle = e.target as HTMLDivElement

    // TODO - schokshi: use a map here?
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
    const initialPosition = position
    const startingMousePosition: position = {
      x: e.pageX,
      y: e.pageY,
    }

    // TODO: Not very dry... How much of this can we move out to generic utilities?
    function handleMouseMove(mouseMoveEvent: MouseEvent) {
      let newWidth: number,
        newHeight: number,
        newWidthScalar = 1,
        newHeightScalar = 1,
        xOffset = 0,
        yOffset = 0

      if (direction.includes('w')) {
        newWidthScalar = -1
      }

      if (direction.includes('n')) {
        newHeightScalar = -1
      }

      if (resizable === 'horizontal' || resizable === 'both') {
        const initial = initialDimensions.width * gridSize
        const delta = mouseMoveEvent.pageX - startingMousePosition.x

        newWidth = Math.round((initial + newWidthScalar * delta) / gridSize)

        if (newWidth < minWidth) {
          newWidth = minWidth
        } else if (newWidth > maxWidth) {
          newWidth = maxWidth
        }

        // TODO - consolidate boundary check for negative values
        if (newWidth > boundaries.width - position.x) {
          newWidth = boundaries.width - position.x
        }

        if (direction.includes('w')) {
          xOffset = newWidth - initialDimensions.width
        }

        if (initialPosition.x - xOffset < 0) {
          xOffset = initialPosition.x
          newWidth = xOffset + initialDimensions.width
        }
      }

      if (resizable === 'vertical' || resizable === 'both') {
        const initial = initialDimensions.height * gridSize
        const delta = mouseMoveEvent.pageY - startingMousePosition.y

        newHeight = Math.round((initial + newHeightScalar * delta) / gridSize)

        if (newHeight < minHeight) {
          newHeight = minHeight
        } else if (newHeight > maxHeight) {
          newHeight = maxHeight
        }

        // TODO - consolidate boundary check for negative values
        if (direction.includes('n')) {
          yOffset = newHeight - initialDimensions.height
        }

        if (newHeight > boundaries.height - position.y - yOffset) {
          newHeight = boundaries.height - position.y - yOffset
        }

        if (initialPosition.y - yOffset < 0) {
          yOffset = initialPosition.y
          newHeight = yOffset + initialDimensions.height
        }
      }

      ;(liveResize ? setDimensions : setNextDimensions)(
        (oldDimensions: dimensions) => ({
          width: newWidth ?? oldDimensions.width,
          height: newHeight ?? oldDimensions.height,
        }),
      )
      ;(liveResize ? setPosition : setNextPosition)({
        x: initialPosition.x - xOffset,
        y: initialPosition.y - yOffset,
      })
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
    // Disallow simultaneous dragging and resizing
    if (isResizing) {
      return
    }

    document.body.style.cursor = 'grabbing'
    setIsDragging(true)

    const initialPosition = position
    const startingMousePosition: position = {
      x: e.pageX,
      y: e.pageY,
    }

    function handleMouseMove(mouseMoveEvent: MouseEvent) {
      let newX, newY

      newX = Math.round(
        (initialPosition.x * gridSize -
          startingMousePosition.x +
          mouseMoveEvent.pageX) /
          gridSize,
      )

      if (newX < 1) {
        newX = 0
      } else if (newX > boundaries.width - width) {
        newX = boundaries.width - width
      }

      newY = Math.round(
        (initialPosition.y * gridSize -
          startingMousePosition.y +
          mouseMoveEvent.pageY) /
          gridSize,
      )

      if (newY < 1) {
        newY = 0
      } else if (newY > boundaries.height - height - 1) {
        newY = boundaries.height - height
      }

      ;(livePosition ? setPosition : setNextPosition)({
        x: newX,
        y: newY,
      })
    }

    function handleMouseUp() {
      document.body.removeEventListener('mousemove', handleMouseMove as any)
      document.body.style.cursor = 'auto'
      setIsDragging(false)
    }

    document.body.addEventListener('mousemove', handleMouseMove as any)
    document.body.addEventListener('mouseup', handleMouseUp, { once: true })
  } as unknown as MouseEventHandler<HTMLButtonElement>

  useEffect(() => {
    if (!isInteracting) {
      setDimensions(nextDimensions)
      setPosition(nextPosition)
    }
  }, [isInteracting])

  // TODO - add keyboard a11y
  // useEffect(() => {
  //   if (item.current) {
  //     item.current.addEventListener('keydown', (e: KeyboardEvent) => {
  //       if (e.key === 'ArrowRight') {
  //         setPosition((oldPosition) => ({
  //           x: oldPosition.x + 1,
  //           y: oldPosition.y,
  //         }))
  //       } else if (e.key === 'ArrowLeft') {
  //         setPosition((oldPosition) => ({
  //           x: oldPosition.x - 1,
  //           y: oldPosition.y,
  //         }))
  //       } else if (e.key === 'ArrowUp') {
  //         setPosition((oldPosition) => ({
  //           x: oldPosition.x,
  //           y: oldPosition.y - 1,
  //         }))
  //       } else if (e.key === 'ArrowDown') {
  //         setPosition((oldPosition) => ({
  //           x: oldPosition.x,
  //           y: oldPosition.y + 1,
  //         }))
  //       }
  //     })
  //   }
  // }, [])

  return (
    <>
      <div
        className={className}
        style={style}
        data-board-item
        tabIndex={0}
        ref={item}
      >
        {children}

        <button
          data-board-item-move
          data-is-interacting={isInteracting}
          onMouseDown={handleMove}
        >
          ::
        </button>

        {canHorizontallyResize && (
          <>
            <div data-board-item-handle="x" />
            <div
              data-board-item-handle="x"
              onMouseDown={(e: MouseEvent) => handleResize(e, 'e')}
            />
          </>
        )}
        {canVerticallyResize && (
          <>
            <div
              data-board-item-handle="y"
              onMouseDown={(e: MouseEvent) => handleResize(e, 'n')}
            />
            <div
              data-board-item-handle="y"
              onMouseDown={(e: MouseEvent) => handleResize(e, 's')}
            />
          </>
        )}
        {canHorizontallyResize && canVerticallyResize && (
          <>
            <Handle direction={'se'} handler={handleResize} />
            <Handle direction={'sw'} handler={handleResize} />
            <Handle direction={'ne'} handler={handleResize} />
            <Handle direction={'nw'} handler={handleResize} />
          </>
        )}
      </div>
      {isInteracting && (
        <div
          data-board-item-ghost
          style={
            {
              '--x': nextPosition.x,
              '--y': nextPosition.y,
              '--width': nextDimensions.width,
              '--height': nextDimensions.height,
            } as CSSProperties
          }
        />
      )}
    </>
  )
}
