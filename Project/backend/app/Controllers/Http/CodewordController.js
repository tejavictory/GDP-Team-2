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
}

module.exports = CodewordController