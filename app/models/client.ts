import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'
import Address from '#models/address'
import Phone from '#models/phone'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Phone)
  declare phones: HasMany<typeof Phone>

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>
}
