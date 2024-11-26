import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'
import { DateTime } from 'luxon'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query()
      .orderBy('id', 'asc')
      .preload('phones')
      .preload('address')

    return response.ok(clients)
  }

  async show({ params, request, response }: HttpContext) {
    const { month, year } = request.qs()

    const client = await Client.find(params.id)
    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }

    await client.load('address')
    await client.load('phones')

    let salesQuery = client.related('sales').query()
      .preload('product')
      .orderBy('created_at', 'desc')

    if (month && year) {
      const startDate = DateTime.fromObject({ year: parseInt(year), month: parseInt(month) }).startOf('month')
      const endDate = startDate.endOf('month')

      if (startDate.isValid && endDate.isValid) {
        salesQuery.whereBetween('created_at', [startDate.toSQL(), endDate.toSQL()])
      } else {
        throw new Error(`Invalid date: ${month}/${year}`)
      }
    }

    const sales = await salesQuery.exec()
    await client.sales().saveMany(sales)

    return response.ok(client)
  }

  async store({ request, response }: HttpContext) {
    const clientData = request.only(['name', 'cpf'])
    const addressData = request.input('address')
    const phonesData = request.input('phones')

    const client = await Client.create(clientData)
    await client.related('address').create(addressData)
    await client.related('phones').createMany(phonesData)

    await client.load('address')
    await client.load('phones')

    return response.created(client)
  }

  async update({ params, request, response }: HttpContext) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }

    const clientData = request.only(['name', 'cpf'])
    const addressData = request.input('address')
    const phonesData = request.input('phones')

    await client.merge(clientData).save()

    if (addressData) {
      await client.related('address').updateOrCreate({}, addressData)
    }

    if (phonesData) {
      await client.related('phones').query().delete()
      await client.related('phones').createMany(phonesData)
    }

    await client.load('address')
    await client.load('phones')

    return response.ok(client)
  }

  async destroy({ params, response }: HttpContext) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }

    await client.related('sales').query().delete()
    await client.related('phones').query().delete()
    await client.related('address').query().delete()
    await client.delete()

    return response.noContent()
  }
}
