'use strict'

const Issue = use('App/Model/Issue')
const User = use('App/Model/User')

class IssuesController {

  * index(request, response) {
    // Send a simple response
    const issues = (yield Issue.all()).toJSON()
    // const user = yield request.auth.getUser()
    // const view = yield response.view('issues/index', {issues})
    // response.send(view)
    // the above can be written shorter:
    yield response.sendView('issues.index', {issues, loggedIn: yield request.auth.check()})
  }

  // Display view to create resource
  * create(request, response) {
    //
  }

  // Store the resource
  * store(request, response) {
    let issue = new Issue()
    issue.assigned_to = request.input('name')
    yield issue.save()
    response.send('Issue saved.')
  }

  * show(request, response) {
    //
    const issue = yield Issue.find(request.param('id'))
    response.send(issue)
  }

  // show edit form
  * edit(request, response) {
    //
    const issue = yield Issue.find(request.param('id'))
    const view = yield response.view('issues.edit', {issue})
    response.send(view)
  }

  * update(request, response) {
    //
    const issue = yield Issue.find(request.param('id'))
    console.log(request.param('assigned_to'))
    issue.assigned_to = request.input('assigned_to')
    yield issue.save()
    response.route('/issues')
  }

  * destroy(request, response) {
    //
  }

}

module.exports = IssuesController
