const allowedBrackets = '[]{}()<>'
const pointMapping = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
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

  return (
    parseInput(input)
      .map((line) => {
        let stack = [] as Array<number>
        let illegalCharacter = ''

        for (const bracket of line) {
          const bracketPairIndex = allowedBrackets.indexOf(bracket)

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
      })
      // Exclude lines without an illegal character
      .filter((checkedData) => checkedData.illegalCharacter !== '')
      .reduce((totalScore, checkedData) => totalScore + checkedData.points, 0)
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
