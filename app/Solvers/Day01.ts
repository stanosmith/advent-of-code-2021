export const solvePart1 = async (input: string) => {
  // input = `199
  //     200
  //     208
  //     210
  //     200
  //     207
  //     240
  //     269
  //     260
  //     263`
  return input
    .split('\n')
    .map((value) => parseInt(value, 10))
    .map(evalIncrease)
    .reduce(calculateTotal, 0)
}

export const solvePart2 = async (input: string) => {
  const window = 3
  // input = `199
  //     200
  //     208
  //     210
  //     200
  //     207
  //     240
  //     269
  //     260
  //     263`
  return (
    input
      .split('\n')
      .map((value) => parseInt(value, 10))
      .reduce((groupedValues, _value, index, values) => {
        if (index >= window - 1) {
          return [...groupedValues, values.slice(index + 1 - window, index + 1)]
        }
        return groupedValues
      }, [])
      .map((values) => values.reduce((sum, value) => sum + value, 0))
      // .map((sum, index, sums) => `${sum}: ${evalIncrease(sum, index, sums)}`)
      .map(evalIncrease)
      .reduce(calculateTotal, 0)
  )
}

function evalIncrease(value, index, values) {
  if (index > 0) {
    if (value > values[index - 1]) {
      return 1
    }
  }
  return 0
}

function calculateTotal(total, value) {
  return total + value
}

export default [solvePart1, solvePart2]
