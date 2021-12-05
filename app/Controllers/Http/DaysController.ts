import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Drive from '@ioc:Adonis/Core/Drive'
import Airtable from 'airtable'
import Env from '@ioc:Adonis/Core/Env'
import got from 'got'
import solvers from 'App/Solvers'

const base = new Airtable({ apiKey: Env.get('AIRTABLE_KEY') }).base(Env.get('AIRTABLE_BASE'))
const tableName = 'Days'

export default class DaysController {
  public async index({ response, request }: HttpContextContract) {
    const year = request.qs().year
    let params = year ? { filterByFormula: `yearName="${year}"` } : {}

    // Pull Days data from Airtable
    const records = await base(tableName).select(params).firstPage()

    return response.send(records)
  }

  public async show({ params, response }: HttpContextContract) {
    // TODO: Pull Day data from Airtable
    const day = await base(tableName).find(params.id)

    if (day) {
      // return response.send(day)

      // TODO: Perform the solutions in the background

      // Get input from the local file system
      // const input = await Drive.get(
      //   Application.tmpPath(`inputs/day-${params.id.padStart(2, '0')}-input.txt`)
      // )

      // Get input from Airtable
      if (day.fields.inputs && Array.isArray(day.fields.inputs)) {
        // inputExample = {
        //   "id": "attTgDPOonsptzEYC",
        //   "url": "https://dl.airtable.com/.attachments/719fa6eb92780979dbcf0a7a0c5c04a5/a2cee7a2/input.txt",
        //   "filename": "input.txt",
        //   "size": 9311,
        //   "type": "text/plain"
        // }
        const dayName = day.fields.name ?? ('' as String)

        const inputs = day.fields.inputs.map(({ filename, url }) => ({
          filename,
          url,
          isOgInput: filename === 'input.txt',
        }))

        const defaultInputData = inputs.find((input) => input.isOgInput)

        // No default input found
        if (!defaultInputData) {
          throw new Error(`No default input found for Day ${dayName}. 🤷`)
        }

        // Load the default input text file
        const input = await got(defaultInputData.url).text()

        // Solve each part
        const daySolvers = solvers[`day${dayName.toString().padStart(2, '0')}`]
        const part1 = { answer: await daySolvers.solvePart1(input) }
        const part2 = { answer: await daySolvers.solvePart2(input) }

        return response.send({ day: dayName, part1, part2 })
      }

      throw new Error(`No inputs found for Day ${day.fields.name}. 🤷`)
    }

    throw new Error(`Sorry, Day with id: ${params.id} doesn't exist. 😔`)
  }
}
