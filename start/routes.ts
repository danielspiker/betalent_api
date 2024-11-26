import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')

// Rotas públicas
router.post('/signup', [AuthController, 'signup'])
router.post('/login', [AuthController, 'login'])

// Grupo de rotas protegidas
router.group(() => {
  // Clientes
  router.get('/clients', [ClientsController, 'index'])
  router.get('/clients/:id', [ClientsController, 'show'])
  router.post('/clients', [ClientsController, 'store'])
  router.put('/clients/:id', [ClientsController, 'update'])
  router.delete('/clients/:id', [ClientsController, 'destroy'])

  // Produtos
  router.get('/products', [ProductsController, 'index'])
  router.get('/products/:id', [ProductsController, 'show'])
  router.post('/products', [ProductsController, 'store'])
  router.put('/products/:id', [ProductsController, 'update'])
  router.delete('/products/:id', [ProductsController, 'destroy'])

  // Vendas
  router.post('/sales', [SalesController, 'store'])
  router.get('/sales', [SalesController, 'index'])
}).middleware('auth')
