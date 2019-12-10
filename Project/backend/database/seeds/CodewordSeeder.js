'use strict'

/*
|--------------------------------------------------------------------------
|  codewordSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class codewordSeeder {
  async run() {
    const codewords = [
      { codeword: "ALERT", codewordset_name: 'Anonymous' },
      { codeword: "ALARM", codewordset_name: 'Anonymous' },
      { codeword: "BEARD", codewordset_name: 'Anonymous' },
      { codeword: "INSERT", codewordset_name: 'Anonymous' },
      { codeword: "DELETE", codewordset_name: 'Anonymous' },
      { codeword: "REVOKE", codewordset_name: 'Anonymous' },
      { codeword: "VANISH", codewordset_name: 'Anonymous' },
      { codeword: "PROMISE", codewordset_name: 'Anonymous' },
      { codeword: "WORLD", codewordset_name: 'Anonymous' },
      { codeword: "ORIGIN", codewordset_name: 'Anonymous' },
      { codeword: "LARGE", codewordset_name: 'Anonymous' },
      { codeword: "CIRCLE", codewordset_name: 'Anonymous' },
      { codeword: "CAPTURE", codewordset_name: 'Anonymous' },
      { codeword: "MONEY", codewordset_name: 'Anonymous' },
      { codeword: "SPEECH", codewordset_name: 'Anonymous' },
      { codeword: "WRITE", codewordset_name: 'Anonymous' },
      { codeword: "SMALL", codewordset_name: 'Anonymous' },
      { codeword: "PRISON", codewordset_name: 'Anonymous' },
      { codeword: "PERSON", codewordset_name: 'Anonymous' },
      { codeword: "MODERN", codewordset_name: 'Anonymous' },
      { codeword: "ONLINE", codewordset_name: 'Anonymous' },
      { codeword: "SOURCE", codewordset_name: 'Anonymous' },
      { codeword: "GRADE", codewordset_name: 'Anonymous' },
      { codeword: "SEARCH", codewordset_name: 'Anonymous' },
      { codeword: "SHARE", codewordset_name: 'Anonymous' },
      { codeword: "ACCOUNT", codewordset_name: 'Anonymous' },
      { codeword: "PENCIL", codewordset_name: 'Anonymous' },
      { codeword: "ERASER", codewordset_name: 'Anonymous' },
      { codeword: "APPLE", codewordset_name: 'Anonymous' }
    ]

    await Database.insert(codewords).into('codewords')
    console.log('Seeded Codewords Data')
  }
}

module.exports = codewordSeeder
