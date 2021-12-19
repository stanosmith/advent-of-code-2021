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
    .map((value) => value.trim())
    .reduce(
      (finalPositionAndDepth, value) => {
        const [command, units] = value.split(' ')
        const parsedUnits = parseInt(units)

        switch (command) {
          case 'up':
            return {
              ...finalPositionAndDepth,
              depth: finalPositionAndDepth.depth - parsedUnits,
            }
          case 'down':
            return {
              ...finalPositionAndDepth,
              depth: finalPositionAndDepth.depth + parsedUnits,
            }
          case 'forward':
          default:
            return {
              ...finalPositionAndDepth,
              horizontalPosition: finalPositionAndDepth.horizontalPosition + parsedUnits,
            }
        }
      },
      {
        horizontalPosition: 0,
        depth: 0,
      }
    )

  return positionAndDepth.horizontalPosition * positionAndDepth.depth
}

export const solvePart2 = async (input: string) => {
  // input = `forward 5
  // down 5
  // forward 8
  // up 3
  // down 8
  // forward 2`
  const positionDepthAndAim = input
    .split('\n')
    .filter((value) => value !== '')
    .map((value) => value.trim())
    .reduce(
      (finalPositionAndDepth, value) => {
        const [command, units] = value.split(' ')
        const parsedUnits = parseInt(units)

        switch (command) {
          case 'up':
            return {
              ...finalPositionAndDepth,
              // depth: finalPositionAndDepth.depth - parsedUnits,
              aim: finalPositionAndDepth.aim - parsedUnits,
            }
          case 'down':
            return {
              ...finalPositionAndDepth,
              // depth: finalPositionAndDepth.depth + parsedUnits,
              aim: finalPositionAndDepth.aim + parsedUnits,
            }
          case 'forward':
          default:
            return {
              ...finalPositionAndDepth,
              horizontalPosition: finalPositionAndDepth.horizontalPosition + parsedUnits,
              depth: finalPositionAndDepth.depth + finalPositionAndDepth.aim * parsedUnits,
            }
        }
      },
      {
        aim: 0,
        horizontalPosition: 0,
        depth: 0,
      }
    )
  // return positionDepthAndAim
  return positionDepthAndAim.horizontalPosition * positionDepthAndAim.depth
}

export default [solvePart1, solvePart2]
