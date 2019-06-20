// var faker = require('faker');
var path = require('path');

/*----------------------PUT DATA INTO SQLITE DB-----------------------*/
var pathway = path.join(__dirname, '../database/description.db');
// const db = new sqlite3.Database(pathway, (err)=>{
//   if (err) {
//     return console.error(err.message);
//   } else {
//     console.log('Connected to SQlite database')
//   }
// });
// for (let i = 0; i < 99; i++) {
//   var title = faker.company.companyName();
//   var summary = faker.commerce.productName();
//   var genre = faker.commerce.department();
//   var location = `${faker.address.city(1)}, ${faker.address.stateAbbr()}`;
//   var creator = `${faker.name.firstName()}, ${faker.name.lastName()}`;
//   var videoUrl = 'https://youtu.be/Yj7ja6BANLM'
  // db.run(`insert into MAIN (title, summary, genre, location, creator, videoURL) values ("${title}", "${summary}", "${genre}", "${location}", "${creator}", "${videoUrl}");`);
// }
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Closed the SQlite database connection');
// });

/*----------------------------------------------------------*/

// module.exports = db;
