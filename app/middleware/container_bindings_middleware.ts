import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { db } from '@adonisjs/lucid/services'

export default class ContainerBindingsMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.db = db
    await next()
  }
}
