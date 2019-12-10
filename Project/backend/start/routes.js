'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.get('/user/me','UserController.me').middleware(['auth:jwt'])
Route.get('/usercourses', 'UserController.getCourses').middleware(['auth:jwt'])
Route.get('/users','UserController.index').middleware(['auth:jwt'])
Route.post('/confirmEmail/:email','UserController.mailConfirmation')
Route.post('/activate','UserController.activate')
Route.post('/resetfinal','UserController.resetpwd')
Route.post('/mailresetpwdlink/:email','UserController.mailresetpwdlink')
Route.post('/updaterole/:username','UserController.update')
Route.post('/delUser/:id','UserController.delete').middleware(['auth:jwt'])

Route.post('/coursecreate', 'CourseController.store')
Route.post('/delcourse/:id', 'CourseController.destroy')
Route.post('/showcourse/:id', 'CourseController.show')
Route.get('/course/:insEmail', 'CourseController.getCourses').middleware(['auth:jwt'])
Route.get('/courses', 'CourseController.index')
Route.put('/courseupdate/:id', 'CourseController.update')
Route.post('/assignSet/:course_name', 'CourseController.assignSet')
Route.get('/getStudents/:id','CourseController.getStudents')
Route.post('/distributedwords/:id','CourseController.distributedwords')

Route.get('/getusercourses','UsercourseController.index')
Route.post('/updateHidden/:courseid','UsercourseController.updateHidden')
Route.post('/updateUserCourse/:courseid','UsercourseController.updateUserCourse')
Route.post('/updateUserCourseMultiple/:courseid','UsercourseController.updateUserCourseMultiple')
Route.post('/getUserCourse/:courseid','UsercourseController.getUserCourse')

Route.post('/addcdwd','CodewordController.store')
Route.get('/getWordsSet/:setname', 'CodewordController.getWordsSet')
Route.get('/getCodeword/:id', 'CodewordController.getCodeword')
Route.post('/addcdwds','CodewordController.storeMultiple')

Route.post('/createset','CodewordsetController.store')
Route.post('/updateset/:id','CodewordsetController.update')
Route.get('/getsets','CodewordsetController.index')
Route.get('/isUniqueName/:name','CodewordsetController.isUniqueName')

Route.get('/reqUsers','InsrequestController.index')
Route.post('/reqIns','InsrequestController.store')
Route.post('/updatereq/:username','InsrequestController.update')
Route.get('/getreqstat/:username','InsrequestController.getreq')

