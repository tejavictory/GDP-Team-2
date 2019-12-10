'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Insrequest extends Model {
    users(){
        return this.hasOne('App/Models/User')
    }

    static get primaryKey () {
        return 'username'
      }
}

module.exports = Insrequest
