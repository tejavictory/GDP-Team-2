'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodewordSchema extends Schema {
  up () {
    this.create('codewords', (table) => {
      table.increments()
      table.string('codeword',10).notNullable()
      table.string('codewordset_name').notNullable()
      table.foreign('codewordset_name').references('codewordsets.name').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('codewords')
  }
}

module.exports = CodewordSchema
