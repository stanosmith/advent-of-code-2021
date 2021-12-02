import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
// import { solvePart1, solvePart2 } from 'App/Solvers/Day01'
import { solvePart1, solvePart2 } from 'App/Solvers/Day02'
import Application from '@ioc:Adonis/Core/Application'

const STATUSES = {
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  COMPLETE: 'COMPLETE',
}
const DAYS = [
  {
    id: 1,
    part1: {
      status: STATUSES.COMPLETE,
      answer: 1154,
    },
    part2: {
      status: STATUSES.COMPLETE,
      answer: 1127,
    },
  },
  {
    id: 2,
    part1: {
      status: STATUSES.COMPLETE,
      answer: 1692075,
    },
    part2: {
      status: STATUSES.QUEUED,
      answer: null,
    },
  },
]

export default class DaysController {
  public async index({ response }: HttpContextContract) {
    // TODO: If the answer isn't available, add the day to the solving queue

    // TODO: Pull the days data from Airtable

    return response.send(DAYS)
  }

  public async show({ params, response }: HttpContextContract) {
    const day = DAYS[params.id - 1]

    if (day) {
      // return response.send({ ...day })

      // TODO: Perform the solutions in the background

      const input = await Drive.get(
        Application.tmpPath(`inputs/day-${params.id.padStart(2, '0')}-input.txt`)
      )
      const part1 = { ...day.part1, answer: await solvePart1(input.toString()) }
      // const part2 = { ...day.part2, answer: await solvePart2(input.toString()) }

      // return response.send({ ...day, part1, part2 })
      return response.send({ ...day, part1 })
    }

    throw new Error(`Sorry, that day doesn't exist. 😔`)
  }
}
