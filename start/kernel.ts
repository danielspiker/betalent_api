import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * Register middleware that will be executed on every HTTP request
 */
server.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('#middleware/container_bindings_middleware')
])

/**
 * Register global middleware that will be executed on every HTTP request
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware')
])

/**
 * Named middleware that can be referenced in route definitions
 */
const middleware = () => ({
  auth: () => import('#middleware/auth_middleware')
})

router.named(middleware())

export { middleware }
