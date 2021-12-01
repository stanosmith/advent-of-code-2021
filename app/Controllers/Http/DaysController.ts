import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import { solvePart1 } from 'App/Solvers/Day01'
import Application from '@ioc:Adonis/Core/Application'

const STATUSES = {
  QUEUED: 'QUEUED',
  COMPLETE: 'COMPLETE',
}
const DAYS = [
  {
    id: 1,
    part1: {
      status: STATUSES.QUEUED,
      description: '',
      question: '',
      answer: 1154,
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
      // TODO: Perform the solutions in the background

      const input = await Drive.get(
        Application.tmpPath(`uploads/day-${params.id.padStart(2, '0')}-input.txt`)
      )
      const answer = await solvePart1(input.toString())

      return response.send({ ...day, answer })
    }

    throw new Error(`Sorry, that day doesn't exist. 😔`)
  }
}
