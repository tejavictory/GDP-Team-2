'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodewordsetSchema extends Schema {
  up () {
    this.create('codewordsets', (table) => {
      table.increments()
      table.string('name',100).notNullable().unique()
      table.string('creator',20).notNullable() // ALTERED IN DATABASE
      table.string('type',10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('codewordsets')
  }
}

module.exports = CodewordsetSchema
