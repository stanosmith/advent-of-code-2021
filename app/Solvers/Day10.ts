const ALLOWED_BRACKETS = '[]{}()<>'

interface CheckedData {
  line: string
  isBalanced: boolean
  illegalCharacter: string
  points: number
  stack: number[]
}

export const solvePart1 = async (input: string) => {
  //   input = `[({(<(())[]>[[{[]{<()<>>
  // [(()[<>])]({[<{<<[]>>(
  // {([(<{}[<>[]}>{[]{[(<()>
  // (((({<>}<{<{<>}{[]{[]{}
  // [[<[([]))<([[{}[[()]]]
  // [{[{({}]{}}([{[{{{}}([]
  // {<[[]]>}<{[{[{[]{()[[[]
  // [<(<(<(<{}))><([]([]()
  // <{([([[(<>()){}]>(<<{{
  // <{([{{}}[<[[[<>{}]]]>[]]`
  const pointMapping = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  return (
    parseInput(input)
      .map(checkSyntax.bind(null, pointMapping))
      // Exclude lines without an illegal character
      .filter((checkedData: CheckedData) => checkedData.illegalCharacter !== '')
      .reduce((totalScore: number, checkedData: CheckedData) => totalScore + checkedData.points, 0)
  )
}

export const solvePart2 = async (input: string) => {
  //   input = `[({(<(())[]>[[{[]{<()<>>
  // [(()[<>])]({[<{<<[]>>(
  // {([(<{}[<>[]}>{[]{[(<()>
  // (((({<>}<{<{<>}{[]{[]{}
  // [[<[([]))<([[{}[[()]]]
  // [{[{({}]{}}([{[{{{}}([]
  // {<[[]]>}<{[{[{[]{()[[[]
  // [<(<(<(<{}))><([]([]()
  // <{([([[(<>()){}]>(<<{{
  // <{([{{}}[<[[[<>{}]]]>[]]`
  const pointMapping = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }

  const lineScores = parseInput(input)
    .map(checkSyntax.bind(null, pointMapping))
    // Only include incomplete lines (e.g. lines without an illegal character
    .filter((checkedData: CheckedData) => checkedData.illegalCharacter === '')
    // Close all open brackets and calculate the score for each one
    .map((checkedData: CheckedData) => {
      // Pop each item off the stack
      let poppedStack = [] as Array<number | string | undefined>
      const stackCopy = [...checkedData.stack]

      for (let i = 0; i < checkedData.stack.length; i++) {
        const poppedIndex = stackCopy.pop()
        if (poppedIndex) {
          poppedStack.push(ALLOWED_BRACKETS[poppedIndex])
        }
      }

      return { ...checkedData, poppedStack }
    })
    // Calculate the total score
    .map((checkedData) => {
      // For each character, multiply the total score by 5 and then increase the total score by the point value given for the character
      const totalLineScore = checkedData.poppedStack.reduce(
        (lineScore: number, character: string) => {
          return lineScore * 5 + pointMapping[character]
        },
        0
      )
      return { ...checkedData, totalLineScore }
    })
    // Create array of scores only
    .map((checkedData) => checkedData.totalLineScore)
    // Sort by score
    .sort((a, b) => a - b)

  // Return only the middle score
  return lineScores[Math.floor(lineScores.length / 2)]
}

function checkSyntax(pointMapping: Object, line: string): CheckedData {
  let stack = [] as Array<number>
  let illegalCharacter = ''

  for (const bracket of line) {
    const bracketPairIndex = ALLOWED_BRACKETS.indexOf(bracket)

    if (bracketPairIndex % 2 === 0) {
      // If this is an opening bracket, push the closing bracket onto the stack
      stack.push(bracketPairIndex + 1)
    } else {
      // If this is a closing bracket, pop it off the stack
      const poppedBracketIndex = stack.pop()
      if (poppedBracketIndex && poppedBracketIndex !== bracketPairIndex) {
        illegalCharacter = bracket
        break
      }
    }
  }

  const isBalanced = stack.length === 0

  return { line, isBalanced, illegalCharacter, points: pointMapping[illegalCharacter], stack }
}

function parseInput(input: string) {
  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
