const { Router } = require('express')
const UserManager = require('../../models/userManager')

const router = Router()
const manager = new UserManager('users.json')

router.post('/', async (req, res) => {
  const { body } =  req

  const created = await manager.create(body)

  res.send(created)
})

module.exports = router