'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().unique()
      table.string('course_name',20).notNullable().unique()
      table.text('startDate').nullable()
      table.text('endDate').nullable()
      table.text('presurveylink').nullable()
      table.text('postsurveylink').nullable()
      table.text('codewordAssignStatus').nullable()
      table.timestamps()
    })
  }


  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
