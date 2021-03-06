import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Airtable from 'airtable'
import got from 'got'
import solvers from 'App/Solvers'

const base = new Airtable({ apiKey: Env.get('AIRTABLE_KEY') }).base(Env.get('AIRTABLE_BASE'))
const tableName = 'Days'
const useCache = true

// Custom interfaces
interface Attachment {
  id: string
  url: string
  filename: string
  size: number
  type: string
}
interface RawJson {
  id: string
  fields: Object
  createdTime: string
}
interface AirtableRecord {
  _table: Object
  _rawJson: RawJson
  id: string
  fields: Object
}
interface PartFields {
  name: string
  description: string
  answer: string
  day: string[]
  year: string[]
  processedData: Attachment[]
}
interface PartJson extends RawJson {
  fields: PartFields
}
interface Part extends AirtableRecord {
  _rawJson: PartJson
  fields: PartFields
}
interface DayFields {
  name: string
  parts: Part[]
  inputs: Attachment[]
  year: string[]
  yearName: string[]
}
interface DayJson extends RawJson {
  fields: DayFields
}
interface Day extends AirtableRecord {
  _rawJson: DayJson
  fields: DayFields
}

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
    const day = await getDay(params)

    // Send 404 if day is not found
    if (!day || !day.fields) {
      return response
        .safeStatus(404)
        .send(`Sorry, no data found for year ${yearName} day ${name}. ????`)
    }

    // Get input from Airtable
    const input = await getInput(day)

    // Get solvers for the day
    const daySolvers = solvers[`day${day.fields.name.padStart(2, '0')}`]

    // Return, or solve and return, the answers for each part
    let answers = [] as Array<any>

    if (typeof daySolvers !== 'undefined') {
      answers = await Promise.all(
        day.fields.parts.map((part, index) => {
          return part.fields.answer || daySolvers[index](input)
        })
      )
      answers = answers.map((answer, index) => ({
        name: `Part ${index + 1}`,
        answer,
      }))
    }

    return response.send({ answers, ...day })
  }
}

async function getInput(day: Day): Promise<string> {
  // INFO: Test object
  // day = {
  //   _table: '',
  //   _rawJson: {
  //     id: '',
  //     createdTime: '',
  //     fields: { name: '', inputs: [], parts: [], year: [''], yearName: [''] },
  //   },
  //   id: '',
  //   fields: { name: '7', inputs: [], parts: [], year: [''], yearName: [''] },
  // }

  // If there is no input data, throw an Error
  if (!day.fields.inputs || !Array.isArray(day.fields.inputs) || day.fields.inputs.length === 0) {
    throw new Error(`No inputs found for Day ${day.fields.name}. ????`)
  }

  // inputExample = {
  //   "id": "attTgDPOonsptzEYC",
  //   "url": "https://dl.airtable.com/.attachments/719fa6eb92780979dbcf0a7a0c5c04a5/a2cee7a2/input.txt",
  //   "filename": "input.txt",
  //   "size": 9311,
  //   "type": "text/plain"
  // }

  const inputs = day.fields.inputs.map(({ filename, url }) => ({
    filename,
    url,
    isOgInput: filename === 'input.txt',
  }))

  const defaultInputData = inputs.find((input) => input.isOgInput)

  // No default input found
  if (!defaultInputData) {
    throw new Error(`No default input found for Day ${day.fields.name}. ????`)
  }

  // Load the default input text file
  return await got(defaultInputData.url).text()
}

async function getDay({ yearName, name }: Record<string, any>): Promise<Day | void> {
  let localPath = Application.tmpPath(`inputs/day-${yearName}-${name.padStart(2, '0')}.json`)
  let day

  // Get day data from the local file system
  if (useCache) {
    try {
      const fileBuffer = await Drive.get(localPath)
      day = JSON.parse(fileBuffer.toString())
    } catch (e) {
      console.info('Day data not cached, file will be loaded from Airtable')
    }
  }

  // Pull Day data from Airtable
  if (!day) {
    try {
      const page = await base(tableName)
        .select({
          filterByFormula: `AND(name="${name}",yearName="${yearName}")`,
        })
        .firstPage()

      // There should only be one item in the array
      day = page[0]

      // Get full data for each part
      day.fields.parts = await Promise.all(
        day.fields.parts.map((id) => {
          return base('Parts').find(id)
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  // Cache the day data
  if (day) {
    await Drive.put(localPath, JSON.stringify(day))
  }

  return day
}
