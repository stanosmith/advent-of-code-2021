export const solvePart1 = async (input: string) => {
  //   input = `2199943210
  // 3987894921
  // 9856789892
  // 8767896789
  // 9899965678`

  return (
    parseInput(input)
      .map((row) => row.split('').map((value) => parseInt(value, 10)))
      .map((row, rowIndex, allRows) => {
        // Find the low points - the locations that are lower than any of its adjacent locations (up, down, left and right)
        return (
          row
            .map((point, pointIndex, allPoints) => {
              const rowPrev = allRows[rowIndex - 1]
              const rowNext = allRows[rowIndex + 1]

              let up
              let right
              let down
              let left

              // Up
              if (rowPrev) {
                up = rowPrev[pointIndex]
              }

              // Right
              if (pointIndex < allPoints.length) {
                right = allPoints[pointIndex + 1]
              }

              // Down
              if (rowNext) {
                down = rowNext[pointIndex]
              }

              // Left
              if (pointIndex > 0) {
                left = allPoints[pointIndex - 1]
              }

              // Only keep unique values. If there is only one value left it will mean all are equal which means the point doesn't count
              const sortedValues = [up, right, down, left, point]
                .filter((value) => typeof value !== 'undefined')
                .sort((a, b) => a - b)
                .reduce((uniqueValues, value) => {
                  if (uniqueValues.indexOf(value) === -1) {
                    return [...uniqueValues, value]
                  }
                  return uniqueValues
                }, [])

              return { point, up, right, down, left, sortedValues }
            })
            // Only include the points which are the lowest
            .filter((data) => {
              return data.sortedValues.length > 1 && data.point === data.sortedValues[0]
            })
        )
      })
      .filter((row) => row.length > 0)
      .flat()
      // Set risk level
      .map((data) => {
        return {
          ...data,
          riskLevel: data.point + 1,
        }
      })
      // Sum all risk levels || `1568` is too high
      .reduce((sum, data) => sum + data.riskLevel, 0)
  )
}

export const solvePart2 = async (input: string) => {
  // input =
  return parseInput(input)
}

function parseInput(input: string) {
  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
