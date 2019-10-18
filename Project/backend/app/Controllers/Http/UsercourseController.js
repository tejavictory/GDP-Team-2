'use strict'

const Database = use('Database')

class UsercourseController {
    async index({ response }) {
        const usercourses = await Database.table('user_course').select('*')
    
        response.status(200).json({
          message: 'Here are your user courses.',
          data: usercourses
        })
    }

    async getUserCourse({ request, response, params: {courseid} }) {
        var email = request.input('email')
        if(email == null){
            email = 'test@gmail.com'
        }
        if(courseid == null){
            courseid = 10
        }
        const usercourse =         await Database
                                        .from('user_course')
                                        .where('course_id','=',courseid)
                                        .andWhere('email','=',email).first()
    
        response.status(200).json({
          message: 'Here is your user course.',
          data: usercourse
        })
    }

    async updateUserCourse({ request, response, params: { courseid } }) {
        const email = request.input('email')
        const codewordid = request.input('codewordid')

        await Database
                    .table('user_course')
                    .where('course_id','=',courseid)
                    .andWhere('email','=',email)
                    .update('codeword_id',codewordid)

        response.status(200).json({
          message: 'Successfully updated codeword for this course and student.',
        })
      }

      async updateHidden({ request, response, params: { courseid } }) {
        const email = request.input('email')

        await Database
                    .table('user_course')
                    .where('course_id','=',courseid)
                    .andWhere('email','=',email)
                    .update('hidden',0)
        
        response.status(200).json({
          message: 'Successfully updated hidden to revealed for this course and student',
        })
      }


}

module.exports = UsercourseController
