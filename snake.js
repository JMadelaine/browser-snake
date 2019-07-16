const canvas = document.getElementById('game-canvas')
const context = canvas.getContext('2d')

const cellSize = {
    width: 64,
    height: 64,
}

const gridSize = {
    width: 10,
    height: 10,
}

const getPositionOnGrid = (cellX, cellY) => {
    if (cellX < 0) {
        cellX = gridSize.width - 1
    }

    if (cellY < 0) {
        cellY = gridSize.height - 1
    }

    cellX = cellX % gridSize.width
    cellY = cellY % gridSize.height

    return {
        position: {
            x: cellX,
            y: cellY,
        },
    }
}

const getRandomNumber = max => {
    return Math.floor(Math.random() * max)
}

const getRandomGridCell = cellsToExclude => {
    let randomCell = null

    while (
        randomCell === null ||
        cellsToExclude.some(
            c =>
                c.position.x === randomCell.position.x &&
                c.position.y === randomCell.position.y
        )
    ) {
        randomCell = getPositionOnGrid(
            getRandomNumber(gridSize.width),
            getRandomNumber(gridSize.height)
        )
    }
    return randomCell
}

const groundColor = 'black'
const snakeColor = 'orange'
const foodColor = 'lime'

let snakeBodyParts = []
snakeBodyParts[0] = getPositionOnGrid(gridSize.width / 2, gridSize.height / 2)
snakeBodyParts[1] = getPositionOnGrid(
    gridSize.width / 2,
    gridSize.height / 2 + 1
)
snakeBodyParts[2] = getPositionOnGrid(
    gridSize.width / 2,
    gridSize.height / 2 + 2
)

let foodItems = []
foodItems[0] = getRandomGridCell(snakeBodyParts)

let score = 0

// Control the snake

// snake starts the game moving upwards
let snakeDirection = 'up'

const setSnakeDirection = event => {
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
}

document.addEventListener('keydown', setSnakeDirection)

// Draw to the canvas

const drawToCanvas = () => {
    for (let i = 0; i < gridSize.width; i++) {
        for (let j = 0; j < gridSize.height; j++) {
            let fillColor = groundColor

            if (
                snakeBodyParts.some(
                    s => s.position.x === i && s.position.y === j
                )
            ) {
                fillColor = snakeColor
            } else if (
                foodItems.some(f => f.position.x === i && f.position.y === j)
            ) {
                fillColor = foodColor
            }

            context.fillStyle = fillColor
            context.fillRect(
                cellSize.width * i,
                cellSize.height * j,
                cellSize.width,
                cellSize.height
            )
        }
    }

    for (let i = 0; i < snakeBodyParts.length; ++i) {
        context.lineWidth = '2'
        context.strokeStyle = 'yellow'
        context.strokeRect(
            cellSize.width * snakeBodyParts[i].position.x + 1,
            cellSize.height * snakeBodyParts[i].position.y + 1,
            cellSize.width - 2,
            cellSize.height - 2
        )
    }

    context.fillStyle = 'white'
    context.font = '32px Consolas'
    context.fillText(score, 12, 32)

    if (gameOver) {
        context.fillStyle = 'white'
        context.font = '48px Consolas'
        context.fillText(
            'GAME OVER',
            cellSize.width * gridSize.width * 0.5 - 120,
            cellSize.height * gridSize.height * 0.5 - 20
        )
    }
}

canvas.width = gridSize.width * cellSize.width
canvas.height = gridSize.height * cellSize.height

let hasEatenFood = false

const getNewSnakePosition = () => {
    let headPositionX = snakeBodyParts[0].position.x
    let headPositionY = snakeBodyParts[0].position.y

    if (snakeDirection === 'up') {
        --headPositionY
    } else if (snakeDirection === 'right') {
        ++headPositionX
    } else if (snakeDirection === 'down') {
        ++headPositionY
    } else {
        --headPositionX
    }

    snakeBodyParts.unshift(getPositionOnGrid(headPositionX, headPositionY))

    // remove last tail body part
    if (!hasEatenFood) {
        snakeBodyParts.pop()
    }

    hasEatenFood = false
}

const tryEatingFood = () => {
    const snakeHeadPosition = snakeBodyParts[0].position

    if (
        foodItems.some(
            f =>
                f.position.x === snakeHeadPosition.x &&
                f.position.y === snakeHeadPosition.y
        )
    ) {
        ++score
        hasEatenFood = true
        foodItems = foodItems.filter(
            f =>
                f.position.x !== snakeHeadPosition.x &&
                f.position.y !== snakeHeadPosition.y
        )
    }
}

const generateRandomFoodItem = () => {
    if (foodItems.length === 0) {
        foodItems.push(getRandomGridCell(snakeBodyParts))
    }
}

let gameOver = false

const checkForCollision = () => {
    if (snakeBodyParts.length > 1) {
        const snakeHeadPosition = snakeBodyParts[0].position
        for (let i = 1; i < snakeBodyParts.length; i++) {
            if (
                snakeBodyParts[i].position.x === snakeHeadPosition.x &&
                snakeBodyParts[i].position.y === snakeHeadPosition.y
            ) {
                gameOver = true
            }
        }
    }
}

const drawNextFrame = () => {
    if (gameOver) {
        clearInterval(game)
    }
    // First calculate new positon of snake
    getNewSnakePosition()

    checkForCollision()
    tryEatingFood()
    // Draw images to canvas
    drawToCanvas()
}

let game = setInterval(() => {
    drawNextFrame()
}, 175)

setInterval(() => {
    generateRandomFoodItem()
}, getRandomNumber(8) * 1000)
