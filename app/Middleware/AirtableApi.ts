import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Airtable from 'airtable'
import Env from '@ioc:Adonis/Core/Env'

const base = new Airtable({ apiKey: Env.get('AIRTABLE_KEY') }).base(Env.get('AIRTABLE_BASE'))

export default class AirtableApi {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    ctx.airtableBase = base

    // Next call is always last
    await next()
  }
}
