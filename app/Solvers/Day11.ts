export const solvePart1 = async (input: string) => {
  input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`
  const steps = 10

  //   input = `11111
  // 19991
  // 19191
  // 19991
  // 11111
  // `
  // const steps = 2

  // How many total flashes are there after 100 steps?

  const initialState = parseInput(input).map((row) =>
    row.split('').map((value) => parseInt(value, 10))
  )

  let recordedSteps = [initialState]

  for (let i = 0; i < steps; i++) {
    // +1 all octopuses
    const steppedValues = recordedSteps[i].map((row) => row.map((value) => value + 1))

    // Process flashed octopuses
    steppedValues.forEach((row, rowIndex, allRows) => {
      row.forEach((energy, energyIndex, allEnergy) => {
        if (energy > 9) {
          // Reset current item's energy to 0
          row[energyIndex] = 0

          const rowPrev = allRows[rowIndex - 1]
          const rowNext = allRows[rowIndex + 1]

          // Above
          if (rowPrev) {
            // Above-Left
            if (typeof rowPrev[energyIndex - 1] !== 'undefined') {
              rowPrev[energyIndex - 1] = rowPrev[energyIndex - 1] + 1
            }
            // Above-Center
            rowPrev[energyIndex] = rowPrev[energyIndex] + 1
            // Above-Right
            if (typeof rowPrev[energyIndex + 1] !== 'undefined') {
              rowPrev[energyIndex + 1] = rowPrev[energyIndex + 1] + 1
            }
          }

          // Right
          if (typeof allEnergy[energyIndex + 1] !== 'undefined') {
            allEnergy[energyIndex + 1] = allEnergy[energyIndex + 1] + 1
          }

          // Below
          if (rowNext) {
            // Below-Left
            if (typeof rowNext[energyIndex - 1] !== 'undefined') {
              rowNext[energyIndex - 1] = rowNext[energyIndex - 1] + 1
            }
            // Below-Center
            rowNext[energyIndex] = rowNext[energyIndex] + 1
            // Below-Right
            if (typeof rowNext[energyIndex + 1] !== 'undefined') {
              rowNext[energyIndex + 1] = rowNext[energyIndex + 1] + 1
            }
          }

          // Left
          if (energyIndex > 0) {
            allEnergy[energyIndex - 1] = allEnergy[energyIndex - 1] + 1
          }
        }
      })
    })

    // Reset flashed octopuses (e.g. anything over 9)
    // recordedSteps.push(steppedValues.map((row) => row.map((value) => (value > 9 ? 0 : value))))
    recordedSteps.push(steppedValues)
  }

  return recordedSteps.map((state) => state.map((values) => values.join('')))
}

export const solvePart2 = async (input: string) => {
  // input =
  return parseInput(input)
}

function parseInput(input: string) {
  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
