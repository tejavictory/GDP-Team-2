'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserCourseSchema extends Schema {
  up () {
    this.create('user_course', (table) => {
      table.string('email',80).index('email')
      table.integer('course_id').unsigned().index('course_id')
      table.integer('codeword_id').unsigned().index('codeword_id')
      table.integer('hidden').nullable()
      table.foreign('email').references('users.email').onDelete('cascade')
      table.foreign('course_id').references('courses.id').onDelete('cascade')
      table.foreign('codeword_id').references('codewords.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('user_course')
  }
}

module.exports = UserCourseSchema
