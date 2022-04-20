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
  const steps = 2

  //   input = `11111
  // 19991
  // 19191
  // 19991
  // 11111
  // `
  //   const steps = 2

  // How many total flashes are there after 100 steps?

  const initialState = parseInput(input).map((row) =>
    row.split('').map((value) => parseInt(value, 10))
  )

  let recordedSteps = [initialState]

  for (let i = 0; i < steps; i++) {
    // +1 all octopuses
    const steppedValues = recordedSteps[i].map((row) => row.map((value) => value + 1))
    // console.log(
    //   'before flash',
    //   steppedValues.map((value) => value.join())
    // )

    // Process flashed octopuses
    steppedValues.forEach((row, rowIndex, allRows) => {
      row.forEach(updateAdjacentOctopuses.bind(null, row, rowIndex, allRows))
    })
    // console.log(
    //   'after flash',
    //   steppedValues.map((value) => value.join())
    // )

    // Reset flashed octopuses (e.g. anything over 9)
    // recordedSteps.push(steppedValues.map((row) => row.map((value) => (value > 9 ? 0 : value))))
    recordedSteps.push(steppedValues)
  }

  return recordedSteps.map((state) =>
    // state.map((values) => values.map((value) => value.toString().padStart(2, '0')).join(','))
    state.map((values) => values.join())
  )
}

function updateAdjacentOctopuses(
  row: number[],
  rowIndex: number,
  allRows: Array<number[]>,
  energy: number,
  energyIndex: number
) {
  if (energy > 9) {
    const rowPrev = allRows[rowIndex - 1]
    const rowNext = allRows[rowIndex + 1]

    const leftIndex = energyIndex - 1
    const rightIndex = energyIndex + 1

    console.log([
      [
        // Above
        addOne(rowPrev, leftIndex),
        addOne(rowPrev, energyIndex),
        addOne(rowPrev, rightIndex),
      ].join(),
      [
        // Right
        addOne(row, rightIndex),
        // Center,
        energy,
        // Left
        addOne(row, leftIndex),
      ].join(),
      [
        // Below
        addOne(rowNext, leftIndex),
        addOne(rowNext, energyIndex),
        addOne(rowNext, rightIndex),
      ].join(),
    ])
  }

  function addOne(row: number[], index: number) {
    try {
      let newEnergy

      // Avoid NaN
      if (typeof row[index] === 'number') {
        newEnergy = row[index] + 1
        row[index] = newEnergy
      }

      // Trigger inception update
      if (newEnergy === 10) {
        console.log(`Octopus with index ${index} FLASHED!`, row)
        // updateAdjacentOctopuses(row, rowIndex, allRows, row[index], index)
      }

      return newEnergy
    } catch (e) {
      // console.error(e)
    }
  }
}

export const solvePart2 = async (input: string) => {
  // input =
  return parseInput(input)
}

function parseInput(input: string) {
  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
