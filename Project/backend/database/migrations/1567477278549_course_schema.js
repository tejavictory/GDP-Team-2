'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.string('course_name',20).notNullable().unique()
      table.string('insEmail',80).notNullable()
      table.text('startDate').nullable()
      table.text('endDate').nullable()
      table.text('presurveylink').nullable()
      table.text('postsurveylink').nullable()
      table.text('codewordAssignStatus').nullable()
      table.string('codewordset',80).nullable()
      table.integer('distributed').nullable()
      table.foreign('codewordset').references('codewordsets.name').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
