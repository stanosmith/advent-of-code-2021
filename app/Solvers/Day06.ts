export const solvePart1 = async (input: string, totalDays?: number) => {
  // input = '3,4,3,1,2'

  // Part 1: How many lanternfish would there be after 80 days?
  if (!totalDays) {
    totalDays = 80 // Test value: 18
  }

  let simulation = parseInput(input)
  for (let i = 0; i < totalDays; i++) {
    simulation = runLifecycle(simulation)
  }
  return simulation.length
}

function runLifecycle(ages) {
  for (let i = 0; i < ages.length; i++) {
    const age = ages[i]
    if (age === 0) {
      ages[i] = 6
      ages.push(9) // HACK: Pushing 9, instead of 8, because it gets decremented at the end of the loop
    } else {
      ages[i] = age - 1
    }
  }
  return ages
}

export const solvePart2 = async (input: string) => {
  // Part 2: How many lanternfish would there be after 256 days?

  // TODO: This is the first time I've needed to have a process run in the background
  //   The best way to solve this is in the DaysController. There is a comment noting the
  //   need to loop through the parts instead of imperatively processing each part. This
  //   way the solve will only be requested if there isn't already an answer.

  return parseInput(input)
}

export const day06Part2Process = async (input: string) => {
  return await solvePart1(input, 256)
}

function parseInput(input) {
  return input
    .split('\n')
    .filter((value) => value !== '')
    .join('')
    .split(',')
    .map((value) => parseInt(value))
}

export default {
  solvePart1,
  solvePart2,
}
