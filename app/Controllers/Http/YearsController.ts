import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class YearsController {
  public async index({ response, request, airtableBase }: HttpContextContract) {
    const urlQueries = request.qs()

    const records = await airtableBase('Years').select(urlQueries).firstPage()

    return response.send({ totalRecords: records.length, records })
  }

  public async show({ response, params, airtableBase }: HttpContextContract) {
    const { name } = params

    const records = await airtableBase('Years')
      .select({ filterByFormula: `name="${name}"` })
      .firstPage()

    return response.send(records)
  }
}
