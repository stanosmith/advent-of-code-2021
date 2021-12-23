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

  // How many total flashes are there after 100 steps?
  return parseInput(input)
}

export const solvePart2 = async (input: string) => {
  // input =
  return parseInput(input)
}

function parseInput(input: string) {
  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
