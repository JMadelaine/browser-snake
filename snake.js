// Variables
const canvas = document.getElementById('game-canvas')
const context = canvas.getContext('2d')

const colors = {
    background: 'black',
    snake: 'orange',
    food: 'lime',
}

const cellSize = {
    width: 32,
    height: 32,
}

const gridSize = {
    width: 24,
    height: 16,
}

const maxFoodCount = 5

let score = 0
let snakeDirection = 'up'
let canChangeDirection = true
let hasEatenFoodOnLastMove = false
let gameOver = false
let snake = []
let food = []

// Set the canvas size
canvas.width = gridSize.width * cellSize.width
canvas.height = gridSize.height * cellSize.height

const getGridPosition = (x, y) => {
    if (x < 0) {
        x = gridSize.width - 1
    }

    if (y < 0) {
        y = gridSize.height - 1
    }

    x %= gridSize.width
    y %= gridSize.height

    return {
        pos: {
            x,
            y,
        },
    }
}

const getRandomInteger = exclusiveMax => {
    return Math.floor(Math.random() * exclusiveMax)
}

const getRandomGridCell = cellsToExclude => {
    let randomCell = null

    while (
        randomCell === null ||
        cellsToExclude.some(
            c => c.pos.x === randomCell.pos.x && c.pos.y === randomCell.pos.y
        )
    ) {
        randomCell = getGridPosition(
            getRandomInteger(gridSize.width),
            getRandomInteger(gridSize.height)
        )
    }
    return randomCell
}

// Control the snake
const setSnakeDirection = event => {
    if (!canChangeDirection) {
        return
    }

    const keyCode = event.keyCode
    if (keyCode === 37 && snakeDirection !== 'right') {
        snakeDirection = 'left'
    } else if (keyCode === 38 && snakeDirection !== 'down') {
        snakeDirection = 'up'
    } else if (keyCode === 39 && snakeDirection !== 'left') {
        snakeDirection = 'right'
    } else if (keyCode === 40 && snakeDirection !== 'up') {
        snakeDirection = 'down'
    }

    canChangeDirection = false
}

// Draw to the canvas
const paintRect = (x, y, w, h, color, borderWidth, borderColor) => {
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

const drawToCanvas = () => {
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
    paintRect(
        0,
        0,
        gridSize.width * cellSize.width,
        gridSize.height * cellSize.height,
        colors.background
    )

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

const getNewSnakePosition = () => {
    if (snake.length < 1) {
        return
    }

    let headPositionX = snake[0].pos.x
    let headPositionY = snake[0].pos.y

    if (snakeDirection === 'up') {
        --headPositionY
    } else if (snakeDirection === 'right') {
        ++headPositionX
    } else if (snakeDirection === 'down') {
        ++headPositionY
    } else {
        --headPositionX
    }

    snake.unshift(getGridPosition(headPositionX, headPositionY))

    // remove last tail body part
    if (!hasEatenFoodOnLastMove) {
        snake.pop()
    }

    hasEatenFoodOnLastMove = false
    canChangeDirection = true
}

const tryEatingFood = () => {
    if (snake.length < 1) {
        return
    }
    const snakeHeadPosition = snake[0].pos

    if (
        food.some(
            f =>
                f.pos.x === snakeHeadPosition.x &&
                f.pos.y === snakeHeadPosition.y
        )
    ) {
        food = food.filter(
            f =>
                !(
                    f.pos.x === snakeHeadPosition.x &&
                    f.pos.y === snakeHeadPosition.y
                )
        )
        ++score
        hasEatenFoodOnLastMove = true
    }
}

const generateRandomFoodItem = () => {
    if(food.length < maxFoodCount)
    food.push(getRandomGridCell(snake))
    setTimeout(() => {
        console.log('new')
        generateRandomFoodItem()
    }, (getRandomInteger(10) + 1) * 1000)
}

const checkForCollision = () => {
    if (snake.length > 1) {
        const snakeHeadPosition = snake[0].pos
        for (let i = 1; i < snake.length; i++) {
            if (
                snake[i].pos.x === snakeHeadPosition.x &&
                snake[i].pos.y === snakeHeadPosition.y
            ) {
                gameOver = true
            }
        }
    }
}

const update = () => {
    if (gameOver) {
        clearInterval(gameLoop)
    }
    // First calculate new positon of snake
    getNewSnakePosition()

    checkForCollision()
    tryEatingFood()
    // Draw images to canvas
    drawToCanvas()
}

// Setup game

// Create the snake with three sections in the middle of the canvas
snake[0] = getGridPosition(gridSize.width / 2, gridSize.height / 2)
snake[1] = getGridPosition(gridSize.width / 2, gridSize.height / 2 + 1)
snake[2] = getGridPosition(gridSize.width / 2, gridSize.height / 2 + 2)

// add first piece of food
generateRandomFoodItem()

document.addEventListener('keydown', setSnakeDirection)

let gameLoop = setInterval(update, 175)

setTimeout(generateRandomFoodItem, (getRandomInteger(10) + 1) * 1000)
