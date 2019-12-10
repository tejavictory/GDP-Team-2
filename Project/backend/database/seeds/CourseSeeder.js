'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CourseSeeder {
  async run () {
    const courses = [      
        {
            course_name : 'ANDRIOD',
            insEmail : 'tarak@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'BIGDATA',
            insEmail : 'tarak@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'IOS',
            insEmail : 'tarak@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'JAVA',
            insEmail : 'ajay@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'WEB APPS',
            insEmail : 'mouni@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'DEV APPS',
            insEmail : 'mouni@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'DATABASE',
            insEmail : 'mouni@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'DOTNET',
            insEmail : 'mouni@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'DATA VISUALIZATION',
            insEmail : 'ajay@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        },
        {
            course_name : 'NETWORK SECURITY',
            insEmail : 'ajay@gmail.com',
            startDate : 'Aug 20, 2019',
            endDate : 'Dec 10, 2019',
            presurveyLink : 'google.com',
            postsurveyLink : 'google.com',
            codewordAssignStatus : '0/0'
        }    
    ]
    
    await Database.insert(courses).into('courses')
    console.log('Seeded Courses Data')
  }
}

module.exports = CourseSeeder
