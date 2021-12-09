export const solvePart1 = async (input: string) => {
  input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

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

  // TODO: determine the number of points where at least two lines overlap

  // TODO: Create the array as we go through the list
  // let diagram = [] as Array<any>

  const coordinates = inputParsed.map((lineSegment) => {
    return lineSegment
      .split(' -> ')
      .map((lineSegment) => lineSegment.split(',').map((value) => parseInt(value)))
  })
  // .reduce((diagram, lineSegment) => {
  //   // [
  //   //   [
  //   //     0,
  //   //     9
  //   //   ],
  //   //   [
  //   //     5,
  //   //     9
  //   //   ]
  //   // ]
  //   lineSegment.flat(2).forEach((value, index) => {
  //     switch (index) {
  //       case 0:
  //         diagram[value]
  //         break
  //       case 1:
  //         break
  //       case 2:
  //         break
  //       case 3:
  //         break
  //     }
  //   })
  //
  //   return diagram
  // }, [])

  return coordinates
  // return { diagram, coordinates }

  // Create the dot matrix
  // const numbersSorted = inputParsed
  //   .map((lineSegment) => lineSegment.split(' -> '))
  //   .flat()
  //   .map((coordinate) =>
  //     coordinate.split(',').map((value, index) => {
  //       if (index === 0) {
  //         return { x: parseInt(value) }
  //       }
  //       return { y: parseInt(value) }
  //     })
  //   )
  //   .flat()
  //   .sort()
  // const maxX = numbersSorted.slice(-1).reduce((_parsedValue, value) => parseInt(value), 0)
  // return { numbersSorted, inputParsed }

  return { inputParsed }
}

export const solvePart2 = async (input: string) => {
  input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

  return input.split('\n').filter((value) => value !== '')
}

export default {
  solvePart1,
  solvePart2,
}
