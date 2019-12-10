'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Database = use('Database')
const Hash = use('Hash')

class UserSeeder {
  async run () {
    const users = [
      {
          username : 'S533100',
          email : 'teja@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'KRISHNA',
          lastname : 'TEJA',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533101',
          email : 'raghu@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'RAGHU',
          lastname : 'KIRAN',
          role_name : 'Student',
          activated : 1
      },
      {
          username : 'S533102',
          email : 'shiva@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'SHIVA',
          lastname : 'PATTI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533103',
          email : 'srinu@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'SRINIVAS',
          lastname : 'RAJU',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533104',
          email : 'jay@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'JAYANTH',
          lastname : 'KAVALI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533105',
          email : 'kittu@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'KRISHNA',
          lastname : 'BOBBILI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533106',
          email : 'naveen@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'NAVEEN',
          lastname : 'ADUSUMALLI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533107',
          email : 'potu@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'PREETHAM',
          lastname : 'POTU',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533108',
          email : 'mahesh@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'MAHESH',
          lastname : 'VITTA',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533109',
          email : 'vithik@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'VITHIK',
          lastname : 'SHERU',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533110',
          email : 'varun@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'VARUN',
          lastname : 'DHAWAN',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533111',
          email : 'ishan@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'ISHAN',
          lastname : 'SHARMA',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533112',
          email : 'babu@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'MOHAN',
          lastname : 'BABU',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533113',
          email : 'saman@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'SAMANTH',
          lastname : 'GOURINENI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533114',
          email : 'karthik@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'KARTHIK',
          lastname : 'MUTHYALA',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533115 ',
          email : 'satya@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'SATYAVRATH',
          lastname : 'INJAMURI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533116',
          email : 'vamsee@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'VAMSEE',
          lastname : 'GANGAPATNAM',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533117',
          email : 'abhi@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'ABHIRAM',
          lastname : 'MADUGULA',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533118',
          email : 'yuvasena@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'DURGA',
          lastname : 'PRASAD',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533119',
          email : 'baba@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'BABA',
          lastname : 'BHASKER',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533120',
          email : 'uday@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'UDAY',
          lastname : 'ALLADI',
          role_name : 'Student',
          activated : 1      },
      {
          username : 'S533122',
          email : 'yaswanth@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'YASWANTH',
          lastname : 'YERRAM',
          role_name : 'Instructor'
      },
      {
          username : 'S533123',
          email : 'tarak@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'TARAKA',
          lastname : 'RAVITEJA',
          role_name : 'Instructor'
      },
      {
          username : 'S533124',
          email : 'fukki@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'MUSHFIQ',
          lastname : 'FUKKI',
          role_name : 'Instructor'
      },
      {
          username : 'S533125',
          email : 'mouni@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'MOUNI',
          lastname : 'KRISHNA',
          role_name : 'Instructor'
      },
      {
          username : 'S533126',
          email : 'ajay@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'AJAY',
          lastname : 'VARMA',
          role_name : 'Instructor'
      },
      {
          username : 'S533127',
          email : 'gopi@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'GOPI',
          lastname : 'AMARA',
          role_name : 'Admin'
      },
      {
          username : 'S533128',
          email : 'rajesh@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'RAJESH',
          lastname : 'KOPPU',
          role_name : 'Admin'
      },
      {
          username : 'S533129',
          email : 'praneeth@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'PRANEETH',
          lastname : 'KALLURI',
          role_name : 'Admin'
      },
      {
          username : 'S533130',
          email : 'sid@gmail.com',
          password : await Hash.make('Amazon@123'),
          firstname : 'SIDDARTH',
          lastname : 'THOGARI',
          role_name : 'Admin'
      }
      
  ]

  await Database.insert(users).into('users')
  console.log('Seeded User Data')
  }
}

module.exports = UserSeeder
