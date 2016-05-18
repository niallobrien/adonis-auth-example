'use strict'

const User = use('App/Model/User')

class AuthController {

  * showRegistrationForm(request, response) {
    yield response.sendView('auth.register')
  }

  * showLoginForm(request, response) {
    yield response.sendView('auth.login')
  }

  // Store the resource
  * register(request, response) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    let user = yield User.findBy('email', email)

    if (!user) {
      // create user
      user = new User()
      user.email = email
      user.password = password
      yield user.save()
      // login
      yield request.auth.attempt(email, password)
      response.redirect('issues')
    } else {
      yield request.withAll().andWith({error: 'User already exists'}).flash()
      response.redirect('back')
    }
  }

  * login(request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const user = yield User.findBy('email', email)
    if (user) {
      // login
      yield request.auth.attempt(email, password)
      response.redirect('issues')
    } else {
      request.withAll()
      yield response.redirect('back')
    }
  }

  * logout(request, response) {
    //
    yield request.auth.logout()
    response.redirect('/')
  }

}

module.exports = AuthController
