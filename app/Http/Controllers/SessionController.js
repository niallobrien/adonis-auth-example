'use strict'

const User = use('App/Model/User')

class SessionController {

  // Display view to create resource
  * create(request, response) {
    yield response.sendView('session.create')
  }

  // Store the resource
  * store(request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const user = yield User.findBy('email', email)
    if (!user) {
      // user not found
      yield request.withAll().flash()
      response.redirect('back')
    }
    // log in
    yield request.auth.attempt(email, password)
    response.redirect('issues')
  }

  * destroy(request, response) {
    //
    yield request.auth.logout()
    yield response.redirect('/')
  }

}

module.exports = SessionController
