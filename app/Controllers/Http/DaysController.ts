import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Airtable from 'airtable'
// import { solvePart1, solvePart2 } from 'App/Solvers/Day01'
// import { solvePart1, solvePart2 } from 'App/Solvers/Day02'
// import { solvePart1, solvePart2 } from 'App/Solvers/Day03'
import { solvePart1, solvePart2 } from 'App/Solvers/Day04'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'

const base = new Airtable({ apiKey: Env.get('AIRTABLE_KEY') }).base(Env.get('AIRTABLE_BASE'))

export default class DaysController {
  public async index({ response }: HttpContextContract) {
    // TODO: If the answer isn't available, add the day to the solving queue

    // Pull Days data from Airtable
    const records = await base('Days').select().firstPage()

    return response.send(records)
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

      return response.send({ ...day, part1 })
      // return response.send({ ...day, part2 })
    }

    throw new Error(`Sorry, that day doesn't exist. 😔`)
  }
}
