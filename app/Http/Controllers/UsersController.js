'use strict'

const User = use('App/Model/User')

class UsersController {

  // Display view to create resource
  * create(request, response) {
    //
    yield response.sendView('users.create')
  }

  // Store the resource
  * store(request, response) {
    //
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
      console.log(user.password)
      yield request.auth.attempt(email, password)
      response.redirect('issues')
    } else {
      console.log('User already exists')
    }
  }

  * show(request, response) {
    //
  }

  // show edit form
  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = UsersController
