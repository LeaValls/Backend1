# Mi app de Ecommerce

Esta es una aplicación que te permite gestionar productos y carritos de compra. Podes agregar, eliminar y actualizar productos, así como también crear y modificar carritos de compra. La aplicación utiliza el motor de plantillas Handlebars para renderizar vistas HTML dinámicas.

## Características Principales

- CRUD de Productos: Agregar, obtener, actualizar y eliminar productos.
- Gestión de Carritos: Crear, actualizar y eliminar carritos de compra.
- Asociación de Productos en Carritos: Agregar y eliminar productos en carritos.
- Búsqueda Avanzada: Filtrar y ordenar productos por categoría, disponibilidad y precio.
- Paginación: Visualiza los productos y carritos en múltiples páginas.
- Vistas de Productos y Carritos: Visualiza productos y detalles de carritos en vistas separadas.

## Tecnologías Utilizadas

- Node.js: Plataforma de JavaScript para el lado del servidor.
- Express.js: Framework web para la construcción de API y rutas.
- MongoDB Atlas: Base de datos utilizada para almacenar productos y carritos.
- Mongoose: Biblioteca de modelado de objetos MongoDB para Node.js.
- Handlebars: Motor de plantillas para renderizar vistas HTML dinámicas.



## Cómo Funciona

1. Agrega, modifica y elimina productos utilizando las rutas `/api/products`.
2. Crea, actualiza y elimina carritos de compra utilizando las rutas `/api/carts`.

---

*Endpoints API y su Utilidad*

### Productos

- **GET /api/products**
  - Retorna una lista de productos.
  - Parámetros de consulta opcionales:
    - `limit`: Número máximo de productos a retornar por página.
    - `page`: Página específica de productos a retornar.
    - `sort`: Orden de los productos (ascendente o descendente) basado en el precio.
    - `query`: Filtrar productos por categoría o disponibilidad.
  - Retorna un objeto con la lista de productos y detalles de paginación.

  - **POST /api/products**
  - Crea un nuevo producto.
  - Cuerpo de la solicitud: Detalles del producto a crear.
  - Retorna el producto creado.

- **GET /api/products/:id**
  - Retorna los detalles de un producto específico según su ID.

- **PUT /api/products/:id**
  - Actualiza los detalles de un producto específico según su ID.
  - Cuerpo de la solicitud: Detalles actualizados del producto.

- **DELETE /api/products/:id**
  - Elimina un producto específico según su ID.

  ### Carritos

- **GET /api/carts**
  - Retorna una lista de carritos de compra.

- **POST /api/carts**
  - Crea un nuevo carrito de compra vacío.
  - Retorna el carrito creado.

- **GET /api/carts/:id**
  - Retorna los detalles de un carrito de compra específico según su ID.

- **PUT /api/carts/:id**
  - Actualiza los detalles de un carrito de compra específico según su ID.
  - Cuerpo de la solicitud: Detalles actualizados del carrito.

- **DELETE /api/carts/:id**
  - Elimina un carrito de compra específico según su ID.

- **POST /api/carts/:cartId/products/:productId**
  - Agrega un producto específico a un carrito de compra específico.
  - No devuelve respuesta.

- **DELETE /api/carts/:cartId/products/:productId**
  - Elimina un producto específico de un carrito de compra específico.
  - No devuelve respuesta.

- **PUT /api/carts/:cartId/products/:productId**
  - Actualiza la cantidad de un producto específico en un carrito de compra específico.
  - Cuerpo de la solicitud: Nueva cantidad del producto.
  - No devuelve respuesta.

- **DELETE /api/carts/:cartId**
  - Vacía un carrito de compra específico.
  - No devuelve respuesta.



---

Creado por Leandro Valls (https://github.com/LeaValls)
