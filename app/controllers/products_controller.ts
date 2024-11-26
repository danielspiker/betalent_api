import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { DateTime } from 'luxon'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query()
      .whereNull('deleted_at')
      .orderBy('name', 'asc')

    return response.ok(products)
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .first()

    if (!product) {
      return response.notFound({ error: 'Product not found' })
    }

    return response.ok(product)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price'])
    const product = await Product.create(data)

    return response.created(product)
  }

  async update({ params, request, response }: HttpContext) {
    const product = await Product.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .first()

    if (!product) {
      return response.notFound({ error: 'Product not found' })
    }

    const data = request.only(['name', 'description', 'price'])
    await product.merge(data).save()

    return response.ok(product)
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .first()

    if (!product) {
      return response.notFound({ error: 'Product not found' })
    }

    await product.merge({ deleted_at: DateTime.now() }).save()

    return response.noContent()
  }
}
