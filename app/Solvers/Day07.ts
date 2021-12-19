export const solvePart1 = async (input: string) => {
  input = '16,1,2,0,4,2,7,1,2,14\n'

  // `input` represents the horizontal position of each crab

  return parseInput(input)
}

export const solvePart2 = async (input: string) => {
  // input =
  return input
}

function parseInput(input: string): Array<number> {
  return input
    .replace('\n', '')
    .split(',')
    .map((value) => parseInt(value))
}

// export default [solvePart1, solvePart2]
export default { solvePart1, solvePart2 }
