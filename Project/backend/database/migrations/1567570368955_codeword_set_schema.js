'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodewordSetSchema extends Schema {
  up () {
    this.create('codeword_sets', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('codeword_sets')
  }
}

module.exports = CodewordSetSchema
