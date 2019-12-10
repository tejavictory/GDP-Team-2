'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Codeword extends Model {

    // static get primaryKey () {
    //     return 'codeword'
    //   }

    codewordset() {
        this.belongsTo('App/Models/Codewordset')
    }
}

module.exports = Codeword
