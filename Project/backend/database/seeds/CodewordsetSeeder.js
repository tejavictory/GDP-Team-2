'use strict'

/*
|--------------------------------------------------------------------------
| CodewordsetSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CodewordsetSeeder {
  async run () {
    const sets = [
      {
        name: 'Anonymous',
        creator: 'Mouni Krishna',
        type: 'LARGE'
      },
      {
        name: 'Anonymous 2',
        creator: 'Mouni Krishna',
        type: 'SMALL'
      }
    ]
    await Database.insert(sets).into('codewordsets')
    console.log('Seeded Codewordset data')
  }
}

module.exports = CodewordsetSeeder
