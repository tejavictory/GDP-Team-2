'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Codewordset extends Model {

    static get primaryKey () {
        return 'name'
      }

    codewords() {
        return this.hasMany('App/Models/Codeword')
    }
}

module.exports = Codewordset
