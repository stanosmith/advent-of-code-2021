export const solvePart1 = async (input: string) => {
  input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

  const numbersDrawn = input
    .split('\n')[0]
    .split(',')
    .map((number) => parseInt(number))

  let boards = [] as Array<any>
  let boardIndex = 0
  input
    .split('\n')
    .slice(2)
    .forEach((numbersRow) => {
      if (numbersRow === '') {
        boardIndex++
      } else {
        const numbers = numbersRow
          .split(' ')
          .filter((value) => value !== '')
          .map((value) => ({ value: parseInt(value), isMarked: false }))

        // Check whether this is the first row
        const currentBoard = boards[boardIndex]
        let row = [numbers]
        if (currentBoard) {
          row = [...currentBoard, numbers]
        }
        boards[boardIndex] = row
      }
    })

  // TODO: Find the board that will win FIRST
  let winningNumbers = [] as Array<number>
  let winningNumber = -1
  let markedBoards = []

  for (let i = 0; i < numbersDrawn.length; i++) {
    const drawnNumber = numbersDrawn[i]

    if (markedBoards.length === 0) {
      markedBoards = boards.map(markBoard.bind(null, drawnNumber))
    } else {
      markedBoards = markedBoards.map(markBoard.bind(null, drawnNumber))
    }

    // Now check for a winner
    winningNumbers = markedBoards.filter(checkIfWinner)

    if (winningNumbers.length) {
      winningNumber = drawnNumber
      break
    }
  }

  return { winningNumber, winningNumbers }
}

function markBoard(value, board) {
  return board.map((row) => {
    return row.map((spot) => {
      if (!spot.isMarked) {
        return { ...spot, isMarked: spot.value === value }
      }
      return spot
    })
  })
}

function checkIfWinner(board) {
  // TODO: Check (by COLUMN and ROW) for a case where all values are checked
  const hasCompleteRow =
    board.filter((row) => {
      return (
        row.filter((spot) => {
          return spot.isMarked
        }).length === row.length
      )
    }).length > 0

  if (hasCompleteRow) return true

  // const hasCompleteColumn =
}

export const solvePart2 = async (input: string) => {
  return input.split('\n')
}

export default {
  solvePart1,
  solvePart2,
}
