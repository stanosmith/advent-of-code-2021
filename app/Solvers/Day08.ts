const digitMappings = [
  'abcefg', // 0
  'cf', // 1
  'acdeg', // 2
  'acdfg', // 3
  'bcdf', // 4
  'abdfg', // 5
  'abdefg', // 6
  'acf', // 7
  'abcdefg', // 8
  'abcdfg', // 9
]

export const solvePart1 = async (input: string) => {
  //   input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
  // edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
  // fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
  // fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
  // aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
  // fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
  // dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
  // bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
  // egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
  // gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
  // `

  // `uniqueSegments` represents all the digits created with a unique number of segments (1, 4, 7 and 8)
  const uniqueSegments = digitMappings
    .map((mapping, index) => ({
      digit: index,
      mapping,
      length: mapping.length,
    }))
    .filter((mapping, _index, allMappings) => {
      return allMappings.filter((subMapping) => subMapping.length === mapping.length).length === 1
    })

  return parseInput(input)
    .map((entry) => {
      const output = entry
        .split(' | ')[1]
        .split(' ')
        .map((pattern) => pattern.split('').join(''))

      return {
        signalPatterns: entry
          .split(' | ')[0]
          .split(' ')
          .map((pattern) => pattern.split('').join('')),
        output,
        uniqueSegments,
        digitsWithUniqueSegments: output.filter((pattern) => {
          return uniqueSegments.find((segment) => segment.length === pattern.length)
        }),
      }
    })
    .reduce((sum, data) => {
      return sum + data.digitsWithUniqueSegments.length
    }, 0)
}

export const solvePart2 = async (input: string) => {
  // input =
  return parseInput(input)
}

function parseInput(input: string) {
  return input.split('\n').filter((value) => value !== '')
}

export default [solvePart1, solvePart2]
