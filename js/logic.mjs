import { colCount, rowCount } from './config.mjs'

const getRandomInteger = exclusiveMax => {
  return Math.floor(Math.random() * exclusiveMax)
}

const getGridCell = (x, y) => {
  x = Math.round(x)
  y = Math.round(y)

  while (x < 0) x = +colCount
  while (y < 0) x = +rowCount

  x %= colCount
  y %= rowCount

  return [x, y]
}

const getRandomGridCell = cellsToExclude => {
  do {
    var randomCell = getGridCell(getRandomInteger(colCount), getRandomInteger(rowCount))
  } while (cellsToExclude.some(([x, y]) => x === randomCell[0] && y === randomCell[1]))

  return randomCell
}

const tryEatingFood = () => {
  if (snake.length < 1) {
    return
  }
  const snakeHeadPosition = snake[0].pos

  if (food.some(f => f.pos.x === snakeHeadPosition.x && f.pos.y === snakeHeadPosition.y)) {
    food = food.filter(f => !(f.pos.x === snakeHeadPosition.x && f.pos.y === snakeHeadPosition.y))
    ++score
    hasEatenFoodOnLastMove = true
  }
}

const generateRandomFoodItem = () => {
  if (food.length < maxFoodCount) food.push(getRandomGridCell(snake))
  setTimeout(() => {
    console.log('new')
    generateRandomFoodItem()
  }, (getRandomInteger(10) + 1) * 1000)
}

const checkForCollision = () => {
  if (snake.length > 1) {
    const snakeHeadPosition = snake[0].pos
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].pos.x === snakeHeadPosition.x && snake[i].pos.y === snakeHeadPosition.y) {
        gameOver = true
      }
    }
  }
}
