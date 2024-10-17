const directions = ['up', 'right', 'down', 'left']

let direction = directions[0]
let bodyCells = []

export const getDirection = () => direction
export const getBodyCells = () => bodyCells

export const turnClockwise = () => {
  const currentDirectionIndex = directions.indexOf(direction)
  if (currentDirectionIndex === directions.length - 1) {
    direction = directions[0]
  } else {
    direction = directions[currentDirectionIndex + 1]
  }
}

export const turnAnticlockwise = () => {
  const currentDirectionIndex = directions.indexOf(direction)
  if (currentDirectionIndex === 0) {
    direction = directions[directions.length - 1]
  } else {
    direction = directions[currentDirectionIndex - 1]
  }
}

export const move = hasJustEatenFood => {
  const headCell = bodyCells[0]
  let x = headCell[0]
  let y = headCell[1]

  if (direction === 'up') y++
  else if (direction === 'right') x++
  else if (direction === 'down') y--
  else x--

  const newHeadCell = [x, y]

  // Add new head cell to front of snake
  let newBodyCells = [newHeadCell, ...bodyCells]

  // Remove tail cell if snake hasn't just eaten food
  if (!hasJustEatenFood) {
    newBodyCells = newBodyCells.slice(0, -1)
  }

  bodyCells = newBodyCells
}

export const initialise = (colCount, rowCount) => {
  // Create the snake with three body cells in the middle of the scene
  snake[0] = getGridPosition(gridSize.width / 2, gridSize.height / 2)
  snake[1] = getGridPosition(gridSize.width / 2, gridSize.height / 2 + 1)
  snake[2] = getGridPosition(gridSize.width / 2, gridSize.height / 2 + 2)
}
