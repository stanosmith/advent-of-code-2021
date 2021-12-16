declare module '@ioc:Adonis/Core/HttpContext' {
  import { AirtableBase } from 'airtable/lib/airtable_base'

  interface HttpContextContract {
    airtableBase: AirtableBase
  }
}
