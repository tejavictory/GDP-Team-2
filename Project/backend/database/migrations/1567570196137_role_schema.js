'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.integer('role_id').unsigned().notNullable().unique()
      table.string('role_name',20).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
