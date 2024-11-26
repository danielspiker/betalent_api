import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Client from '#models/client'
import Product from '#models/product'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare client_id: number

  @column()
  declare product_id: number

  @column()
  declare quantity: number

  @column()
  declare unit_price: number

  @column()
  declare total_price: number

  @column.dateTime()
  declare created_at: DateTime

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
