import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class YearsController {
  public async index({ response, request }: HttpContextContract) {
    return response.send(request.params())
  }

  public async show({ response, request }: HttpContextContract) {
    return response.send(request.params())
  }
}
