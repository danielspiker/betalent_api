# Sistema de Vendas API

## Requisitos
- Node.js 20.10.0
- MySQL
- Adonis 6.14.1

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo .env com suas credenciais do banco de dados
4. Execute as migrations:
```bash
node ace migration:run
```

5. Inicie o servidor:
```bash
node ace serve --watch
```

## Rotas da API

### Autenticação
- POST /signup - Cadastro de usuário
- POST /login - Login de usuário

### Clientes
- GET /clients - Lista todos os clientes
- GET /clients/:id - Detalha um cliente específico
- POST /clients - Cadastra novo cliente
- PUT /clients/:id - Atualiza um cliente
- DELETE /clients/:id - Remove um cliente

### Produtos
- GET /products - Lista todos os produtos
- GET /products/:id - Detalha um produto
- POST /products - Cadastra novo produto
- PUT /products/:id - Atualiza um produto
- DELETE /products/:id - Soft delete de um produto

### Vendas
- POST /sales - Registra uma nova venda
- GET /sales - Lista vendas (com filtros opcionais)

## Estrutura do Banco de Dados

### Users
- id: number
- email: string (unique)
- password: string

### Clients
- id: number
- name: string
- cpf: string (unique)

### Addresses
- id: number
- client_id: number (foreign key)
- street: string
- number: string
- complement: string
- neighborhood: string
- city: string
- state: string
- zip_code: string

### Phones
- id: number
- client_id: number (foreign key)
- number: string

### Products
- id: number
- name: string
- description: string
- price: decimal
- deleted_at: datetime (nullable)

### Sales
- id: number
- client_id: number (foreign key)
- product_id: number (foreign key)
- quantity: number
- unit_price: decimal
- total_price: decimal
- created_at: datetime
