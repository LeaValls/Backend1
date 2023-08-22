const { Router } = require('express');
const path = require('path');
const productManager = require('../managers/ProductManager');
const userManager = require('../managers/UserManager')
const isAuth = require('../middlewares/auth.middleware')


const router = Router();


router.get('/', async (req, res) => {

  const { page= 1, size= 5 } = req.query
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page, size)

  pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:8080/?page=${pageInfo.prevPage}&size=${size}` : ''
  pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:8080/?page=${pageInfo.nextPage}&size=${size}` : ''

  console.log("ID del product manager desde home router", productManager.id)

  console.log(pageInfo)

  req.session.homeCount = (req.session.homeCount || 0) + 1
  

  res.render('home', {
    title: 'Home',
    products,
    pageInfo,
    user: req.user ?  {
      ...req.user,
      isAdmin: req.user?.role == 'admin',
    } : null,
    style: 'home'
  })
})

router.get('/chat', (req, rest) => {
  rest.render('chat')
})

router.get ('/realtimeproducts', async (req, res) => {
  const product = await productManager.getAll()

  res.render('realTimeProducts', {
    title: 'Real Time',
    products,
    user: {
      ...req.user,
      isAdmin: req.user.role == 'admin'
    },  
    style: 'home'
  })
})



router.get('/cart', (req, res) => {
  
  res.render('carrito', {
    numItems: 2,
    title: 'Cart'
  });
});

router.get('/profile', isAuth, (req, res) => {
  res.render('profile', {
    ...req.session.user
  })
})
router.get('/signup', (_, res) => res.render('signup'))
router.post('/signup', async (req, res) => {
  const user = req.body
  
  console.log(user)

  const existing = await userManager.getByEmail(user.email)

  if (existing) {
    return res.render('signup', {
      error: 'El email ya existe'
    })
  }

  // crear al usuario
  try {
    const newUser = await userManager.create(user)

    req.session.user = {
      name: newUser.firstname,
      id: newUser._id,
      ...newUser._doc
    }

    console.log(req.session)

    req.session.save((err) => {
      res.redirect('/')
    })

  } catch(e) {
    return res.render('signup', {
      error: 'Ocurrio un error. Intentalo mas tarde'
    })
  }

  

})

router.get('/login', (_, res) => res.render('login'))
router.post('/login', async (req, res) => {
  const { email } = req.body

  try {

    const user = await userManager.getByEmail(email)

    if (!user) {
      return res.render('login', { error: 'El usuario no existe' })
    }

    req.session.user = {
      name: user.firstname,
      id: user._id,
        ...user
    }

    req.session.save((err) => {
      if(!err) {
        res.redirect('/')
      }
    })
  } catch(e) {
    res.render('login', { error: 'Ha ocurrido un error' })
  }

  // guardo la session con la informacion del usuario


  
})
router.get('/logout', isAuth, (req, res) => {
  const { user } = req.cookies

  // borrar la cookie
  res.clearCookie('user')

  req.session.destroy((err) => {
    if(err) {
      return res.redirect('/error')
    }

    res.render('logout', {
      user: req.user.name
    })

    req.user = null
  })
})

module.exports = router;
