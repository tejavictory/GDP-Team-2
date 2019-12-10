'use strict'

const Course = use('App/Models/Course')
const Database = use('Database')
const User = use('App/Models/User')

class CourseController {
  async index({ response }) {
    const courses = await Course.all()

    response.status(200).json({
      message: 'Here are your courses.',
      data: courses
    })
  }

  async store({ request, response }) {
    const data = request.only(['course_name', 'startDate', 'endDate', 'presurveylink', 'postsurveylink', 'codewordAssignStatus', 'insEmail'])
    const users = request.input('users')
    const course = await Course.create(data)
    await course.save()
    // const { course_name, startDate, endDate, presurveylink, postsurveylink, codewordAssignStatus, users } = request.post()
    // const course = await Course.create({ course_name, startDate, endDate, presurveylink, postsurveylink, codewordAssignStatus })

    if (users && users.length > 0) {
      await course.users().attach(users)
      course.users = await course.users().fetch()
    }
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

    // const users = await course.users().fetch()
    const students = await Database
      .from('user_course')
      .where('course_id', '=', course.id)
      .select('email')
    var users = []
    var x = 0
    for (x = 0; x < students.length; x++) {
      // const user = await User.find(students[x].email)
      // users.push(user)
      const user = students[x].email
      users.push(user)
    }
    course.users = users

    response.status(200).json({
      message: 'Here is your course.',
      data: course
    })
  }

  async getCourses({ request, response, params: { insEmail } }) {
    const courses = await Course.query().where('insEmail', '=', insEmail).fetch()
    response.status(200).json({
      message: 'Here are your courses.',
      data: courses
    })
  }

  async getStudents({ request, response, params: { id } }) {
    const course = await Course.find(id)
    // const students = await course.users().fetch()

    const students = await Database
      .from('user_course')
      .where('course_id', '=', course.id)
      .select('email')
    var users = []
    var x = 0
    for (x = 0; x < students.length; x++) {
      // const user = await User.find(students[x].email)
      const useremail = students[x].email
      users.push(useremail)
    }
    console.log(users)
    response.status(200).json({
      message: 'Here are your students.',
      data: users
    })
  }

  async update({ request, response, params: { id } }) {

    var course = await Course.findBy('id', id)

    var startDate = request.input('startDate')
    var endDate = request.input('endDate')
    var presurveylink = request.input('presurveylink')
    var postsurveylink = request.input('postsurveylink')
    var users = request.input('users')

    course.startDate = startDate
    course.endDate = endDate
    course.presurveylink = presurveylink
    course.postsurveylink = postsurveylink
    await course.save()

    if (users && users.length > 0) {
      await course.users().detach()
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

    var course = await Course.findBy('course_name', course_name)

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
