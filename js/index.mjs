import { colCount, rowCount, cellWidth, cellHeight } from './config.mjs'
import { setWidth, setHeight } from './scene'

// Set the canvas size
setWidth(cellWidth * colCount)
setHeight(cellHeight * rowCount)

const update = () => {
  if (gameOver) {
    clearInterval(gameLoop)
  }

  // First calculate new positon of snake
  getNewSnakePosition()

  // Check if snake started eating itself
  checkForCollision()

  // Check if snake started eating food
  tryEatingFood()

  // Render scene
  drawToCanvas()
}

let gameLoop = setInterval(update, 30)

// add first piece of food
generateRandomFoodItem()
