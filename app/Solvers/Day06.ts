export const solvePart1 = async (input: string) => {
  // input = '3,4,3,1,2'

  // How many lanternfish would there be after 80 days?
  let totalDays = 80 // Test values: 18 or 80

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
      ages.push(9) // Pushing 9 because it gets decremented at the end of the loop
    } else {
      ages[i] = age - 1
    }
  }
  return ages
}

export const solvePart2 = async (input: string) => {
  return parseInput(input)
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
