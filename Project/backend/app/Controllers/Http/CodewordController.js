'use strict'

const Codeword = use('App/Models/Codeword')

class CodewordController {
    async index({ response }) {
        const codewords = await Codeword.all()
    
        response.status(200).json({
          message: 'Here are your codewords.',
          data: codewords
        })
    }

    async getCodeword({ response, params: {id} }) {
      const codeword = await Codeword.find(id)
  
      response.status(200).json({
        message: 'Here is your codewords.',
        data: codeword
      })
  }

    async getWordsSet({ request, response, params: { setname } }) {
      const codewords = await Codeword.query().where('codewordset_name', '=', setname).fetch()
  
      response.status(200).json({
        message: 'Here are your codewords for the given set.',
        data: codewords
      })
  }

    async store({ request, response }) {
        const data = request.only(['codeword','codewordset_name'])
        const codeword = await Codeword.create(data)
        await codeword.save()

        // if (users && users.length > 0) {
        //   await course.users().attach(users)
        //   course.users = await course.users().fetch()
        // }
        response.status(200).json({
            message: 'Done adding codeword.',
            data: codeword
        })
      }

      async storeMultiple({ request, response }) {
        const words = request.input('codewords')
        const setname = request.input('codewordset_name')
        var i = 0
        for (i=0;i<words.length;i++){
            const codeword = new Codeword()
            codeword.codeword = words[i]
            codeword.codewordset_name = setname
            await codeword.save()
        }
        response.status(200).json({
            message: 'Done adding codeword.',
            data: words
        })
      }
}

module.exports = CodewordController
