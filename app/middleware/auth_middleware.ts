import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { verifyJWT } from '@adonisjs/auth/jwt'
import User from '#models/user'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('Authorization')

    if (!authHeader) {
      return ctx.response.unauthorized({ error: 'No token provided' })
    }

    const [, token] = authHeader.split(' ')

    try {
      const payload = await verifyJWT(token)
      const user = await User.find(payload.sub)

      if (!user) {
        return ctx.response.unauthorized({ error: 'Invalid token' })
      }

      ctx.user = user
      await next()
    } catch (error) {
      return ctx.response.unauthorized({ error: 'Invalid token' })
    }
  }
}
