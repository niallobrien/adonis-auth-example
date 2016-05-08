'use strict'

const Schema = use('Schema')

class CreateIssuesTableSchema extends Schema {

  up () {
    this.create('issues', (table) => {
      table.increments()
      table.string('assigned_to')
      table.timestamps()
    })
  }

  down () {
    this.drop('issues')
  }

}

module.exports = CreateIssuesTableSchema
