export const solvePart1 = async (input: string) => {
  //   const inputArray = `00100
  // 11110
  // 10110
  // 10111
  // 10101
  // 01111
  // 00111
  // 11100
  // 10000
  // 11001
  // 00010
  // 01010`
  const inputArray = input.split('\n')

  const gammaRate = getGammaRate(inputArray)
  const epsilonRate = getEpsilonRate(inputArray)

  // return gammaRate
  // return epsilonRate
  return gammaRate * epsilonRate
}

function getGammaRate(input) {
  const gammaBinary = input
    .map((value) => value.split('').map((bit) => parseInt(bit)))
    .reduce((mostCommonOuter, currentBits, index, allBits) => {
      if (index < currentBits.length) {
        const { zero, one } = allBits
          .map((bits) => bits[index])
          .reduce(
            (mostCommonInner, bit) => {
              const key = bit === 0 ? 'zero' : 'one'
              return {
                ...mostCommonInner,
                [key]: mostCommonInner[key] + 1,
              }
            },
            { zero: 0, one: 0 }
          )

        if (zero > one) {
          return [...mostCommonOuter, 0]
        }
        return [...mostCommonOuter, 1]
      }
      return mostCommonOuter
    }, [])
    .join('')
  return parseInt(gammaBinary, 2)
}

function getEpsilonRate(input) {
  const epsilonBinary = input
    .map((value) => value.split('').map((bit) => parseInt(bit)))
    .reduce((mostCommonOuter, currentBits, index, allBits) => {
      if (index < currentBits.length) {
        const { zero, one } = allBits
          .map((bits) => bits[index])
          .reduce(
            (mostCommonInner, bit) => {
              const key = bit === 0 ? 'zero' : 'one'
              return {
                ...mostCommonInner,
                [key]: mostCommonInner[key] + 1,
              }
            },
            { zero: 0, one: 0 }
          )

        if (zero > one) {
          return [...mostCommonOuter, 1]
        }
        return [...mostCommonOuter, 0]
      }
      return mostCommonOuter
    }, [])
    .join('')
  return parseInt(epsilonBinary, 2)
}

export const solvePart2 = async (input: string) => {
  input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`
  return input.split('\n')
}

export default {
  solvePart1,
  solvePart2,
}
