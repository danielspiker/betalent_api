import type { HttpContext } from '@adonisjs/core/http'
import Sale from '#models/sale'
import Product from '#models/product'
import Client from '#models/client'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const data = request.only(['client_id', 'product_id', 'quantity'])

    // Verificar se cliente existe
    const client = await Client.find(data.client_id)
    if (!client) {
      return response.notFound({ error: 'Client not found' })
    }

    // Verificar se produto existe e não está deletado
    const product = await Product.query()
      .where('id', data.product_id)
      .whereNull('deleted_at')
      .first()

    if (!product) {
      return response.notFound({ error: 'Product not found' })
    }

    // Calcular preços
    const unit_price = product.price
    const total_price = unit_price * data.quantity

    const sale = await Sale.create({
      client_id: data.client_id,
      product_id: data.product_id,
      quantity: data.quantity,
      unit_price,
      total_price
    })

    await sale.load('client')
    await sale.load('product')

    return response.created(sale)
  }
}
