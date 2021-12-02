export const solvePart1 = async (input: string) => {
  //   input = `forward 5
  // down 5
  // forward 8
  // up 3
  // down 8
  // forward 2`
  const positionAndDepth = input
    .split('\n')
    .filter((value) => value !== '')
    .reduce(
      (finalPositionAndDepth, value) => {
        const [command, units] = value.split(' ')
        switch (command) {
          case 'up':
            return {
              ...finalPositionAndDepth,
              depth: finalPositionAndDepth.depth - parseInt(units),
            }
          case 'down':
            return {
              ...finalPositionAndDepth,
              depth: finalPositionAndDepth.depth + parseInt(units),
            }
          case 'forward':
          default:
            return {
              ...finalPositionAndDepth,
              horizontalPosition: finalPositionAndDepth.horizontalPosition + parseInt(units),
            }
        }
        // return [...finalPositionAndDepth, { [command]: units }]
      },
      {
        horizontalPosition: 0,
        depth: 0,
      }
    )

  return positionAndDepth.horizontalPosition * positionAndDepth.depth
}

export const solvePart2 = async (input: string) => {
  return input.split('\n')
}
