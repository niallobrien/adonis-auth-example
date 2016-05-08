'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| Router helps you in defining urls and their corresponding actions. Adonis
| Router is an upto date implementation of HTTP specs and handle common
| conventions gracefully.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.get('/signup', 'UsersController.create').as('signup')
Route.post('/signup', 'UsersController.store')

Route.get('/signin', 'SessionController.create').as('signin')
Route.post('/signin', 'SessionController.store')
Route.delete('/signout', 'SessionController.destroy')

Route.group('admin', () => {
  Route.resource('issues', 'IssuesController')
}).middleware('auth')

