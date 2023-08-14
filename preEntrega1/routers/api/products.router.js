const { Router } = require('express')
const productManager = require('../../managers/ProductManager')


const router = Router()

console.log("product manager id: ", productManager.id)
router.get('/:id', async (req, res) => {
  const { id } = req.params

  
  console.log(id)

  try {
    const product = await productManager.getById(id)

    if (!product) {
      res.sendStatus(404)
      return
    }

    res.send(product)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
    return
  }
})

router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.render('products', { products, page, totalPages });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products');
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.post('/', async (req, res) =>  {
  const { body, io } = req

  const product = await productManager.create(body)

  console.log(product)

  
  io.emit('productoNew', product)
  
  res.status(201).send(product)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params 

  const result = await productManager.delete(id)
  console.log(result)

  if (result.deletedCount >= 1) {
    res.sendStatus(200)
    return
  }

  res.sendStatus(404)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const result = await productManager.update(id, body)

    console.log(result)
    if (result.matchedCount >= 1) {
      res.sendStatus(202)
      return
    }

    res.sendStatus(404)
    
  } catch(e) {
    res.status(500).send({
      message: "Ha ocurrido un error en el servidor",
      exception: e.stack
    })
  }  
})

module.exports = router
