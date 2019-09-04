'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodewordSchema extends Schema {
  up () {
    this.create('codewords', (table) => {
      table.increments()
      table.integer('codeword_id').unsigned().notNullable().unique()
      table.string('codeword',10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('codewords')
  }
}

module.exports = CodewordSchema
