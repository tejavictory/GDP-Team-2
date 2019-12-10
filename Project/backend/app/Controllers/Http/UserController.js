'use strict'

const User = use('App/Models/User')

class UserController {
    async index ({ request, auth, response }) {
        const users = await User.all()

        response.status(200).json({
            message: 'Here are your users.',
            data: users
        })
    }

    async signup ({ request, auth, response }) {
        const userData = request.only(['username', 'email', 'password', 'firstname', 'lastname', 'role_name'])    
        try {
            const user = await User.create(userData)
            const token = await auth.generate(user)
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.' + error
            })
        }
    }

    async login ({ request, auth, response }) {
        const email = request.input('email')
        const user = await User.find(email)
        if(user.activated==0){
            return response.json({
              status: 'mail not confirmed',
              data: user
          })
        }
        try {
            const token = await auth.attempt(
                email,
                request.input('password')
            )
    
            return response.json({
                status: 'success',
                data: token
            })
        } catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'Invalid email/password'
            })
        }
    }

    async getCourses({ request, response, params: {id} }) {
        const email = request.input('email')
        const user = await User.find(email)
        const courses = await user.courses().fetch()
        user.courses = courses
    
        response.status(200).json({
          message: 'Here are your courses.',
          data: courses
        })
    }

    async me ({ auth, response }) {
        const user = await User.query()
            .where('id', auth.current.user.id)
            .firstOrFail()
    
        return response.json({
            status: 'success',
            data: user
        })
    }

    
    async update({ request, response, params: { username } }) {
        const role_name = request.input('role_name')

        const user = await User.findBy('username',username)
        console.log(user)
        user.role_name = role_name
        await user.save()
    
        response.status(200).json({
          message: 'Successfully updated this user role.',
          data: user
        })
      }

      async activate({ auth, request, response }) {
        var atob = require('atob')
        var token = request.input('usertoken')
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))
        var dataa = JSON.parse(jsonPayload)

        const user = await User.findBy('id',dataa.uid)
  
        user.activated = 1
        user.save()
        return response.json({
            status: 'success',
            data: user
        })
      }

      async mailConfirmation({ request, response, params: {email} }) {
        const Mail = use('Mail')
        const token = request.input('usertoken')
        // '<html><body>Click the following link to confirm your email and activate your codewords app account. <button onclick="activate()">Please click here</button><script>function activate() {var http = new XMLHttpRequest();var url = \'https://codewordcreed.herokuapp.com/activate\';http.open(\'POST\', url,true);http.setRequestHeader(\'Authorization\', `Bearer ${'+token+'}`);http.onreadystatechange = function() {if(http.readyState == 4 && http.status == 200) {alert(http.responseText);}}http.send();}</script></body><html>'
        await Mail.raw('<html><body><a href="https://objective-colden-380a8f.netlify.com/#/confirm/'+token+'">Click Here</a> to activate your account.</body></html>', (message) => {
          message.from('codewordsapp@gmail.com', 'Codewords Application')
          message.to(email)
        })
 
        response.status(200).json({
          message: 'Successfully sent mail.',
        })
      }

      async mailresetpwdlink({ auth, request, response, params: {email} }) {
        const Mail = use('Mail')
        const user = await User.find(email)
        const token = await auth.generate(user)
        // '<html><body>Click the following link to confirm your email and activate your codewords app account. <button onclick="activate()">Please click here</button><script>function activate() {var http = new XMLHttpRequest();var url = \'https://codewordcreed.herokuapp.com/activate\';http.open(\'POST\', url,true);http.setRequestHeader(\'Authorization\', `Bearer ${'+token+'}`);http.onreadystatechange = function() {if(http.readyState == 4 && http.status == 200) {alert(http.responseText);}}http.send();}</script></body><html>'
        await Mail.raw('<html><body><a href="https://objective-colden-380a8f.netlify.com/#/reset/'+token.token+'">Click Here to reset your password.</a></body></html>', (message) => {
          message.from('codewordsapp@gmail.com', 'Codewords Application')
          message.to(email)
        })

        response.status(200).json({
          message: 'Successfully sent mail.',
        })
      }

      async resetpwd({ request, response }) {
        var atob = require('atob')

        const password = request.input('password')

        var token = request.input('usertoken')
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))
        var dataa = JSON.parse(jsonPayload)
        const user = await User.findBy('email',dataa.uid)

        user.password = password
        user.save()
        response.status(200).json({
          message: 'Password reset successful.',
        })
      }

      


}

module.exports = UserController
