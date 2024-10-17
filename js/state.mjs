let score = 0
export const getScore = () => score
export const incrementScore = increment => (score += increment)

let foodCells = []
export const getFoodCells = () => foodCells
export const addFoodCell = foodCell => {
  foodCells = [...foodCells, foodCell]
}

export const removeFoodCell = foodCell => {
  foodCells = foodCells.filter(([x, y]) => x !== foodCell[0] || y !== foodCell[1])
}
