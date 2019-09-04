'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodewordSchema extends Schema {
  up () {
    this.create('codewords', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('codewords')
  }
}

module.exports = CodewordSchema
