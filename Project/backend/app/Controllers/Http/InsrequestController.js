'use strict'

const Insrequest = use('App/Models/Insrequest')

class InsrequestController {

    async index({ response }) {
        const insrequests = await Insrequest.all()
    
        response.status(200).json({
          message: 'Here are your requests.',
          data: insrequests
        })
      }

      async getreq({ response, params: {username} }) {
        const insrequest = await Insrequest.find(username)
        response.status(200).json({
          message: 'Here is your request.',
          data: insrequest
        })
      }

      async store({ request, response }) {
        const data = request.only(['username', 'status'])
        const insrequest = await Insrequest.create(data)
        await insrequest.save()

        response.status(200).json({
            message: 'Done adding request.',
            data: insrequest
        })
      }

      async update({ request, response, params: { username } }) {
        const status = request.input('status')

        const insrequest = await Insrequest.find(username)
        
        insrequest.status = status
        await insrequest.save()
    
        response.status(200).json({
          message: 'Successfully updated this request.',
          data: insrequest
        })
      }
    
}

module.exports = InsrequestController
