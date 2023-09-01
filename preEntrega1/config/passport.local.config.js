const passport = require('passport')
const local = require('passport-local')
const github = require('./passport.github')

const userManager = require('../managers/UserManager')
const { hashPassword, isValidPassword } = require('../utils/password.utils')

const LocalStrategy = local.Strategy

const signup = async (req, email, password, done) => {
  const {
    email: _email,
    password: _password,
    password2: _password2,
    ...user
} = req.body;

  const _user = await userManager.getByEmail(email)

  if (_user) {
    console.log('usuario ya existe')
    return done(null, false)
  }

  try {
    const newUser = await userManager.create({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      age: newUser.age,
      password: hashPassword(password)
    })

    
    return done(null, {
      firstname: newUser.firstname,
      id: newUser._id,
      ...newUser._doc
    })

  } catch(e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}
const login = async (email, password, done) => {
  try {
    const _user = await userManager.getByEmail(email)

    if (!_user) {
      console.log('usuario no existe')
      return done(null, false)
    }

    if (!password) {
      return done(null, false)
    }

    if(!isValidPassword(password, _user.password)) {
      console.log('credenciales no coinciden')
      return done(null, false)
    }

    
    done(null, _user)

  } catch(e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}



module.exports = {
  LocalStrategy,
  signup,
  login,
};