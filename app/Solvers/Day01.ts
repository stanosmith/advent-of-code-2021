export const solvePart1 = async (input: string) => {
  // export const solvePart1 = async () => {
  return (
    input
      .split('\n')
      //   return `199
      // 200
      // 208
      // 210
      // 200
      // 207
      // 240
      // 269
      // 260
      // 263`
      // .split('\n')
      .map((value) => parseInt(value, 10))
      .map((value, index, values) => {
        if (index > 0) {
          if (value > values[index - 1]) {
            return 1
          }
        }
        return 0
      })
      .reduce((total, value) => total + value, 0)
  )
}

export const solvePart2 = async (input: string) => {
  input = `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`
  return input
    .split('\n')
    .map((value) => parseInt(value, 10))
    .reduce((groupedValues, value, index, values) => {
      return [...groupedValues]
    }, [])
}
