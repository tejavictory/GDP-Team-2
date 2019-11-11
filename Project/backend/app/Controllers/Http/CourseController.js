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

      async destroy({ request, response, params: { id } }) {
        // await Course.find(request.input('name')).delete()
        const course = await Course.find(id)
        course.delete()
        response.status(200).json({
          message: 'Successfully deleted this course.',
          data: course
        })
      }
    
      async show({ request, response, params: { id } }) {
        const course = await Course.find(id)
        
        // const tags = await project.tags().fetch()
    
        // project.tags = tags
    
        response.status(200).json({
          message: 'Here is your course.',
          data: course
        })
      }
      async getCourses({ request, response, params: { insEmail } }) {
        const courses = await Course.query().where('insEmail','=',insEmail).fetch()    
        response.status(200).json({
          message: 'Here are your courses.',
          data: courses
        })
      }

      async getStudents({ request, response, params: { id } }) {
        const course = await Course.find(id)
        const students = await course.users().fetch()
        response.status(200).json({
          message: 'Here are your students.',
          data: students
        })
      }
    
      async update({ request, response, params: { id } }) {
        const course_name = request.input()

        var course = Course.find(id)
        
        course.course_name = data.course_name
        course.startDate = data.startDate
        course.endDate = data.endDate
        course.presurveylink = data.presurveylink
        course.postsurveylink = data.postsurveylink
        course.codewordAssignStatus = data.codewordAssignStatus
        await course.save()
    
        if (users && users.length > 0) {
          // await course.users().detach()
          await course.users().attach(users)
          course.users = await course.users().fetch()
        }
    
        response.status(200).json({
          message: 'Successfully updated this course.',
          data: course
        })
      }

      async assignSet({ request, response, params: { course_name } }) {
        const setname = request.input('setname')

        var course = await Course.findBy('course_name',course_name)
        
        course.codewordset = setname
        await course.save()
        
        response.status(200).json({
          message: 'Successfully updated set for this course.',
          data: course
        })
      }

      async distributedwords({ request, response, params: { id } }) {

        var course = await Course.find(id)
        
        course.distributed = 1
        await course.save()
        
        response.status(200).json({
          message: 'Successfully distributed for this course.',
          data: course
        })
      }
    


}

module.exports = CourseController
