import { sortBy } from 'lodash'

export const solvePart1 = async (input: string) => {
  // input = '16,1,2,0,4,2,7,1,2,14\n'

  // `input` represents the horizontal position of each crab

  // Test moving all crabs to each listed position
  // - Find the highest position value and loop through all those values to see which position is best
  // - Store the `position` and the `total`
  // - Sort by `total`, highest to lowest, and pop() the last item off to get the answer

  const crabPositions = parseInput(input)

  const highestPosition = getHighestPosition(crabPositions)

  let calculations = [] as Array<Object>
  for (let i = 0; i < highestPosition + 1; i++) {
    calculations.push({
      position: i,
      fuel: crabPositions.reduce((sum, value) => {
        return sum + Math.abs(i - value)
      }, 0),
    })
  }

  return sortBy(calculations, 'fuel')[0].fuel
  // return sortBy(calculations, 'fuel')
  // return calculations
}

export const solvePart2 = async (input: string) => {
  // input = '16,1,2,0,4,2,7,1,2,14\n'
  const crabPositions = parseInput(input)

  const highestPosition = getHighestPosition(crabPositions)

  let calculations = [] as Array<Object>
  for (let i = 0; i < highestPosition + 1; i++) {
    calculations.push({
      position: i,
      fuel: crabPositions.reduce((sum, value) => {
        const positionDiff = Math.abs(i - value)
        const ogFuel = sum + positionDiff
        // TODO: Add the variable fuel rate to the originally calculated value
        const variableFuel = Array(positionDiff).fill(undefined).reduce(calculateVariableFuel, 0)
        return ogFuel + variableFuel
      }, 0),
    })
  }

  return sortBy(calculations, 'fuel')[0].fuel
  // return sortBy(calculations, 'fuel')
}

function calculateVariableFuel(sum, _value, index, _allValues) {
  return sum + index
}

function getHighestPosition(positions) {
  return [...positions].sort((a, b) => a - b).pop() || 0
}

function parseInput(input: string): Array<number> {
  return input
    .replace('\n', '')
    .split(',')
    .map((value) => parseInt(value))
}

export default [solvePart1, solvePart2]
