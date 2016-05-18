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

Route.get('/register', 'AuthController.showRegistrationForm').as('register')
Route.post('/register', 'AuthController.register').as('register')

Route.get('/login', 'AuthController.showLoginForm').as('login')
Route.post('/login', 'AuthController.login')
Route.delete('/logout', 'AuthController.logout')

Route.group('admin', () => {
  Route.resource('issues', 'IssuesController')
}).middleware('auth')

