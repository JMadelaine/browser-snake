export const onArrowUp = callback => {
  const handler = event => {
    if (event.key === 'ArrowUp') {
      callback()
    }
  }

  document.addEventListener('keydown', handler)
}

export const onArrowDown = callback => {
  const handler = event => {
    if (event.key === 'ArrowUp') {
      callback()
    }
  }

  document.addEventListener('keydown', handler)
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
