'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodewordSetSchema extends Schema {
  up () {
    this.create('codewordsets', (table) => {
      table.increments()
      table.integer('codewordset_id').unsigned().notNullable().unique()
      table.string('creator',20).notNullable()
      table.string('type',10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('codeword_sets')
  }
}

module.exports = CodewordSetSchema
