import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { createJWT } from '@adonisjs/auth/jwt'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      return response.conflict({ error: 'Email already registered' })
    }

    const user = await User.create({
      email: data.email,
      password: await hash.make(data.password)
    })

    const token = await createJWT({ sub: user.id })
    
    return response.created({ user, token })
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    
    const user = await User.findBy('email', email)
    if (!user || !(await hash.verify(user.password, password))) {
      return response.unauthorized({ error: 'Invalid credentials' })
    }

    const token = await createJWT({ sub: user.id })
    
    return response.ok({ user, token })
  }
}