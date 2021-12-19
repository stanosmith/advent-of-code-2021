export const solvePart1 = async (input: string) => {
  //   input = `0,9 -> 5,9
  // 8,0 -> 0,8
  // 9,4 -> 3,4
  // 2,2 -> 2,1
  // 7,0 -> 7,4
  // 6,4 -> 2,0
  // 0,9 -> 2,9
  // 3,4 -> 1,4
  // 0,0 -> 8,8
  // 5,5 -> 8,2`

  const inputParsed = input.split('\n').filter((value) => value !== '')

  // NOTE: x is horizontal, y is vertical (x,y -> x,y)
  // So, the horizontal and vertical lines from the above list would produce the following diagram:
  // .......1..
  // ..1....1..
  // ..1....1..
  // .......1..
  // .112111211
  // ..........
  // ..........
  // ..........
  // ..........
  // 222111....

  const coordinates = inputParsed
    .map((lineSegment) => {
      return lineSegment
        .split(' -> ')
        .map((lineSegment) => lineSegment.split(',').map((value) => parseInt(value)))
    })
    // Remove diagonal lines
    .filter((lineSegment) => {
      const points = lineSegment.flat(2)
      const startX = points[0]
      const startY = points[1]
      const endX = points[2]
      const endY = points[3]
      return startX === endX || startY === endY
    })
  // console.log(coordinates)
  // return coordinates

  // Find the max X and Y positions
  const sortedX = coordinates
    .flat()
    .map((coordinate) => {
      return coordinate[0]
    })
    .sort((a, b) => a - b)
  const sortedY = coordinates
    .flat()
    .map((coordinate) => {
      return coordinate[1]
    })
    .sort((a, b) => a - b)
  // return { sortedX, sortedY }

  // Find the maximum X,Y coordinates
  const maxX = sortedX[sortedX.length - 1] + 1
  const maxY = sortedY[sortedY.length - 1] + 1
  // console.log({ maxX, maxY })
  // return { maxX, maxY }

  // Create the array grid filled with zeroes
  const filledArray = Array(maxY)
    .fill(undefined)
    .map((_row) => Array(maxX).fill(0))
  // console.log(filledArray);

  return (
    coordinates
      .reduce((diagram, lineSegment) => {
        const points = lineSegment.flat(2)

        // X,Y Sorted
        const sortedX = [points[0], points[2]].sort((a, b) => a - b)
        const sortedY = [points[1], points[3]].sort((a, b) => a - b)

        // X values
        const startX = sortedX[0]
        const endX = sortedX[1]

        // Y values
        const startY = sortedY[0]
        const endY = sortedY[1]
        // console.log({ startX, endX, startY, endY });

        const isVerticalLine = startX === endX

        // Vertical line
        if (isVerticalLine) {
          return diagram.map((row, rowIndex) => {
            if (rowIndex >= startY && rowIndex <= endY) {
              return row.map((column, colIndex) => {
                if (colIndex >= startX && colIndex <= endX) {
                  return column + 1
                }
                return column
              })
            }

            // No lines interact with this row
            return row
          })
        }

        // Horizontal line
        return diagram.map((row, rowIndex) => {
          if (rowIndex === startY) {
            return row.map((column, colIndex) => {
              if (colIndex >= startX && colIndex <= endX) {
                return column + 1
              }
              return column
            })
          }
          return row
        })
      }, filledArray)
      // INFO: This spits out a pretty cool visualization of the processed data
      // DEBUG: START: Convert to strings for better readability
      // .map((row) => row.map((column) => (column === 0 ? '.' : column)))
      // .map((row) => row.join(''))
      // DEBUG: END: Convert to strings for better readability
      // Flatten the arrays and only keep values >= 2
      .flat()
      // INFO: 4372 is NOT correct
      .filter((value) => value >= 2).length
  )
}

export const solvePart2 = async (input: string) => {
  //   input = `0,9 -> 5,9
  // 8,0 -> 0,8
  // 9,4 -> 3,4
  // 2,2 -> 2,1
  // 7,0 -> 7,4
  // 6,4 -> 2,0
  // 0,9 -> 2,9
  // 3,4 -> 1,4
  // 0,0 -> 8,8
  // 5,5 -> 8,2`

  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
