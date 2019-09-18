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
    
      async store({ request, response }) {
        const data = request.only(['course_name', 'startDate', 'endDate', 'presurveylink', 'postsurveylink', 'codewordAssignStatus'])
    
        const course = await Course.create(data)
    
        // if (tags && tags.length > 0) {
        //   await project.tags().attach(tags)
        //   project.tags = await project.tags().fetch()
        // }
        await course.save()
        response.status(200).json({
            message: 'Done adding course.',
            data: course
          })
      }

}

module.exports = CourseController
