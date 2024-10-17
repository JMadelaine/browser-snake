const canvas = document.createElement('canvas')
const renderingContext = canvas.getContext('2d')

if (!renderingContext) {
  throw new Error('Error getting canvas rendering context')
}

export const setWidth = width => (canvas.width = width)
export const setHeight = height => (canvas.height = height)
export const getElement = () => canvas

// Draw to the canvas
export const paintRect = (x, y, w, h, color, borderWidth, borderColor) => {
  context.fillStyle = color
  context.fillRect(x, y, w, h)

  if (borderWidth && borderColor) {
    context.lineWidth = borderWidth
    context.strokeStyle = borderColor
    context.strokeRect(
      x + Math.floor(borderWidth / 2),
      y + Math.floor(borderWidth / 2),
      w - Math.floor(borderWidth),
      h - Math.floor(borderWidth)
    )
  }
}

export const drawToCanvas = () => {
  // paint the game over message
  if (gameOver) {
    context.fillStyle = 'white'
    context.font = '48px Consolas'
    context.fillText(
      'GAME OVER',
      cellSize.width * gridSize.width * 0.5 - 120,
      cellSize.height * gridSize.height * 0.5 - 20
    )
    return
  }

  // paint background first
  context.fillStyle = colors.background
  paintRect(0, 0, gridSize.width * cellSize.width, gridSize.height * cellSize.height, colors.background)

  // paint the food
  for (let i = 0; i < food.length; i++) {
    paintRect(
      cellSize.width * food[i].pos.x,
      cellSize.height * food[i].pos.y,
      cellSize.width,
      cellSize.height,
      colors.food
    )
  }

  // paint the snake
  for (let i = 0; i < snake.length; i++) {
    paintRect(
      cellSize.width * snake[i].pos.x,
      cellSize.height * snake[i].pos.y,
      cellSize.width,
      cellSize.height,
      colors.snake,
      2,
      'white'
    )
  }

  // paint the score
  context.fillStyle = 'white'
  context.font = '32px Consolas'
  context.fillText(score, 12, 32)
}
