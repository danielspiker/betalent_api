import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  typescript: true,
  directories: {
    views: 'resources/views',
    public: 'public',
  },
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
    () => import('@adonisjs/core/providers/bodyparser_provider'),
    () => import('@adonisjs/cors'),
    () => import('@adonisjs/lucid'),
    () => import('@adonisjs/auth'),
    () => import('@adonisjs/auth/auth_provider')
  ],
  metaFiles: [
    {
      pattern: 'resources/views/**/*.edge',
      reloadServer: false,
    },
    {
      pattern: 'public/**',
      reloadServer: false,
    },
  ],
  commands: [
    () => import('@adonisjs/core/commands'),
    () => import('@adonisjs/lucid/commands'),
  ],
})
