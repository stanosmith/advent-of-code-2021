import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Airtable from 'airtable'
import got from 'got'
import solvers from 'App/Solvers'

const base = new Airtable({ apiKey: Env.get('AIRTABLE_KEY') }).base(Env.get('AIRTABLE_BASE'))
const tableName = 'Days'
const useCache = false

export default class DaysController {
  public async index({ response, params, request }: HttpContextContract) {
    const urlQueries = request.qs()
    const { yearName } = params

    // Pull Days data from Airtable
    const records = await base(tableName)
      .select({ filterByFormula: `yearName="${yearName}"` })
      .firstPage()

    return response.send({ urlQueries, totalRecords: records.length, records })
  }

  public async show({ params, response }: HttpContextContract) {
    // Get cached day, if not found, get from Airtable and then cache it
    const { yearName, name } = params
    let localPath = Application.tmpPath(`inputs/day-${yearName}-${name.padStart(2, '0')}.json`)
    let day

    if (useCache) {
      try {
        // Get day data from the local file system
        const fileBuffer = await Drive.get(localPath)
        day = JSON.parse(fileBuffer.toString())
      } catch (e) {
        console.info('Day data not cached, file will be loaded from Airtable')
      }
    }

    if (!day) {
      try {
        // Pull Day data from Airtable
        const page = await base(tableName)
          .select({
            filterByFormula: `AND(name="${name}",yearName="${yearName}")`,
          })
          .firstPage()

        // There should only be one item in the array
        day = page[0]
      } catch (e) {
        console.error(e)
      }
    }

    if (day) {
      // Cache the day data
      await Drive.put(localPath, JSON.stringify(day))

      // TODO: Loop through the parts, load their data and only solve if there is no answer

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

        let part1 = {}
        let part2 = {}

        // If we have solvers, solve each part
        if (typeof daySolvers !== 'undefined') {
          part1 = { answer: await daySolvers.solvePart1(input) }
          part2 = { answer: await daySolvers.solvePart2(input) }
        }

        return response.send({ part1, part2, ...day })
      }

      throw new Error(`No inputs found for Day ${day.fields.name}. 🤷`)
    }

    return response.safeStatus(404).send(`Sorry, no data found for ${name}/${yearName}. 😔`)
  }
}
