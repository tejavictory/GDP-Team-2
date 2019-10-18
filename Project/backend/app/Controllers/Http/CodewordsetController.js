'use strict'

const Codewordset = use('App/Models/Codewordset')

class CodewordsetController {

    async index({ response }) {
      const codewordsets = await Codewordset.all()

      response.status(200).json({
        message: 'Here are your codeword sets.',
        data: codewordsets
      })
    }

    async isUniqueName({ request, response, params: {name} }) {
      const codewordset = await Codewordset.findBy('name',name)

      response.status(200).json({
        message: 'Here is your codeword set.',
        data: codewordset
      })
    }

    async store({ request, response }) {
        const data = request.only(['name', 'creator', 'type'])
        const codewords = request.input('codewords')
        const codewordset = await Codewordset.create(data)
        await codewordset.save()

        if (codewords && codewords.length > 0) {
          await codewordset.codewords().attach(codewords)
          codewordset.codewords = await codewordset.codewords().fetch()
        }
        response.status(200).json({
            message: 'Done adding codewordset.',
            data: codewordset
          })
      }

      async update({ request, response, params: {id} }) {
        const codewordset = await Codewordset.find(id)
        const codewords = request.input('codewords')
        await codewordset.save()

        if (codewords && codewords.length > 0) {
          await codewordset.codewords().detach(codewords)
          await codewordset.codewords().attach(codewords)
          codewordset.codewords = await codewordset.codewords().fetch()
        }
        response.status(200).json({
            message: 'Done adding codewordset.',
            data: codewordset
        })
    }
}

module.exports = CodewordsetController
