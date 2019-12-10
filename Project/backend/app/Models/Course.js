'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {
    users() {
        return this.belongsToMany('App/Models/User','course_id','email').pivotTable('user_course')
    }
}

module.exports = Course
