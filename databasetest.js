const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


// async function setup() {
//   const db = await sqlite.open('./mydb.sqlite')
//   await db.migrate({force: 'last'})
// }
//
// setup()

// // this is a top-level await
(async () => {

  // open the database
  const db = await open({
    filename: './data.db',
    driver: sqlite3.Database
  })


  // Create a table
  // db.schema
  //   .createTable('items', table => {
  //     table.increments('id');
  //     table.string('text');
  //   })
  //   // Then query the table...
  //   .then((data) => {
  //       // console.log('db', db)
  //       console.log('data', data)
  //       // db('items').insert({text: 'Item'})
  //     }
  //   ).catch((error) => console.error(error))

  // db('items').insert({text: 'Item'})

  const items = await db.all('select * from items')
  console.log(items)
})()