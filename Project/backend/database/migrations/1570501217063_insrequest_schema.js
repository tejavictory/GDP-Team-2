'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InsrequestSchema extends Schema {
  up () {
    this.create('insrequests', (table) => {
      table.increments()
      table.string('username').notNullable().unique()
      table.foreign('username').references('users.username').onDelete('cascade')
      table.string('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('insrequests')
  }
}

module.exports = InsrequestSchema
