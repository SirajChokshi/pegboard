import React, { PropsWithChildren, useEffect } from 'react'

type dimensions = [number, number]
type position = [number, number]

interface BoardItemProps extends PropsWithChildren {
  resizable?: 'horizontal' | 'vertical' | 'both' | 'none'
  maxWidth?: number
  maxHeight?: number
  defaultPosition?: position
  defaultDimensions?: dimensions
}

export function BoardItem({
  children,
  maxWidth = 2,
  maxHeight = 2,
  resizable = 'both',
  defaultPosition = [0, 0],
  defaultDimensions = [1, 1],
}: BoardItemProps) {
  const [[width, height], setDimensions] =
    React.useState<dimensions>(defaultDimensions)
  const [[x, y], setPosition] = React.useState<position>(defaultPosition)

  const leftHandle = React.useRef<HTMLDivElement>(null)
  const rightHandle = React.useRef<HTMLDivElement>(null)
  const topHandle = React.useRef<HTMLDivElement>(null)
  const bottomHandle = React.useRef<HTMLDivElement>(null)

  const item = React.useRef<HTMLDivElement>(null)

  const style = {
    '--x': x,
    '--y': y,
    '--width': width,
    '--height': height,
  } as React.CSSProperties

  const canHorizontallyResize =
    resizable === 'horizontal' || resizable === 'both'
  const canVerticallyResize = resizable === 'vertical' || resizable === 'both'

  useEffect(() => {
    if (canHorizontallyResize) {
      const leftHandleEl = leftHandle.current!
      const rightHandleEl = rightHandle.current!

      const handleDrag = (e: MouseEvent) => {
        const { clientX } = e
        const { left, width } = leftHandleEl.getBoundingClientRect()
        const newWidth = Math.min(
          maxWidth,
          Math.max(1, width - (clientX - left)),
        )
        setDimensions((dimensions) => [newWidth, dimensions[1]])
      }

      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mouseup', handleDragEnd)
      }

      leftHandleEl.addEventListener('mousedown', (e) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handleDragEnd)
      })

      rightHandleEl.addEventListener('mousedown', (e) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handleDragEnd)
      })
    }

    if (canVerticallyResize) {
      const topHandleEl = topHandle.current!
      const bottomHandleEl = bottomHandle.current!

      const handleDrag = (e: MouseEvent) => {
        const { clientY } = e
        const { top, height } = topHandleEl.getBoundingClientRect()
        const newHeight = Math.min(
          maxHeight,
          Math.max(1, height - (clientY - top)),
        )
        setDimensions((dimensions) => [dimensions[0], newHeight])
      }

      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mouseup', handleDragEnd)
      }

      topHandleEl.addEventListener('mousedown', (e) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handleDragEnd)
      })

      bottomHandleEl.addEventListener('mousedown', (e) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handleDragEnd)
      })
    }
  }, [leftHandle, rightHandle, topHandle, bottomHandle])

  useEffect(() => {
    if (item.current) {
      const itemEl = item.current!

      const handleDrag = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { left, top } = itemEl.getBoundingClientRect()
        const newX = Math.max(0, Math.round(clientX - left))
        const newY = Math.max(0, Math.round(clientY - top))
        setPosition([newX, newY])
      }

      const handleDragEnd = () => {
        document.removeEventListener('mousemove', handleDrag)
        document.removeEventListener('mouseup', handleDragEnd)
      }

      itemEl.addEventListener('mousedown', (e) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleDrag)
        document.addEventListener('mouseup', handleDragEnd)
      })
    }
  }, [item])

  return (
    <div style={style} data-board-item ref={item}>
      {children}

      {canHorizontallyResize && (
        <>
          <div data-board-item-handle-x ref={leftHandle} />
          <div data-board-item-handle-x ref={rightHandle} />
        </>
      )}
      {canVerticallyResize && (
        <>
          <div data-board-item-handle-y ref={topHandle} />
          <div data-board-item-handle-y ref={bottomHandle} />
        </>
      )}
    </div>
  )
}
