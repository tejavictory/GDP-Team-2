'use strict'

const Course = use('App/Models/Course')

class CourseController {
    async index({ response }) {
        const courses = await Course.all()
    
        response.status(200).json({
          message: 'Here are your courses.',
          data: courses
        })
      }
   

}

module.exports = CourseController
