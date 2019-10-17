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
      response.status(200).json({
          message: 'Done adding codeword.',
          data: codeword
      })
    }
}

module.exports = CodewordController