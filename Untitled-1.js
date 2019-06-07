const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;
const seedCount = process.env.SEEDCOUNT || 1000000;
const iterations = process.env.ITERATIONS || 1;
let currentIteration = 0;

console.log(
	`🚀 Attempt to seed ${seedCount} records x ${iterations} times to database ${pgDatabase} at ${pgHost}:${pgPort}`
);

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

console.time('seedTime');

const seedDb = () => {
	currentIteration++;

	console.log(`✈️ Iteration #${currentIteration}`);

	pool.connect().then((client) => {
		let done = () => {
			console.log('Stream ended');
			client.release();
			if (currentIteration < iterations) {
				seedDb();
			}
		};

		let count = 0;

		const stream = client.query(
			copyFrom('COPY users (first_name,last_name,email,avatar_url,created_at) FROM STDIN')
		);
		const rs = new Readable();

		rs._read = () => {
			if (count >= seedCount) {
				rs.push(null);
			} else {
				rs.push(
					faker.name.firstName() +
						'\t' +
						faker.name.lastName() +
						'\t' +
						faker.internet.email() +
						'\t' +
						faker.internet.avatar() +
						'\t' +
						faker.date.recent(90).toUTCString() +
						'\n'
				);
				count++;
			}
		};

		let onError = (strErr) => {
			console.error('Something went wrong:', strErr);
			done();
		};

		rs.on('error', onError);
		stream.on('error', onError);
		stream.on('end', done);
		rs.pipe(stream);
	});
};

seedDb();

process.on('exit', () => {
	console.timeEnd('seedTime');
});


const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');
const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const createTables = fs.readFileSync(path.join(__dirname, 'init_tables.sql')).toString();

console.log(`🚀 Attempt to connect to database ${pgDatabase} at ${pgHost}:${pgPort} as ${pgUser}`);

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

function generateTables() {
	return pool.connect().then((client) => {
		return client
			.query(createTables)
			.then(() => {
				client.release();
				return console.log('Table Generated!');
			})
			.catch((e) => {
				client.release();
				return console.log(e);
			});
	});
}

generateTables().then(process.exit).catch((e) => {
	console.log(e);
	process.exit;
});



Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@seo218 
0
0 0 hrnycjenga/punchstarter-comments
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Security  Insights  Settings
punchstarter-comments/db/seed/seedCommentsTable.js
@zackzeyu zackzeyu Fix logs
8a0f45c 2 hours ago
110 lines (91 sloc)  2.6 KB
    
const { Pool } = require('pg');
const faker = require('faker');

const pgHost = process.env.PGHOST || 'localhost';
const pgUser = process.env.PGUSER || 'punchcomments';
const pgDatabase = process.env.PGDATABASE || 'punch';
const pgPassword = process.env.PGPASSWORD || 'password';
const pgPort = process.env.PGPORT || 5432;

const copyFrom = require('pg-copy-streams').from;
const Readable = require('stream').Readable;
const seedCount = process.env.SEEDCOUNT || 1000000;
const iterations = process.env.ITERATIONS || 1;
let currentIteration = 0;

console.log(
	`🚀 Attempt to seed ${seedCount} records x ${iterations} times to database ${pgDatabase} at ${pgHost}:${pgPort}`
);

const pool = new Pool({
	user: pgUser,
	host: pgHost,
	database: pgDatabase,
	password: pgPassword,
	port: pgPort
});

console.time('seedTime');
const seedDb = () => {
	currentIteration++;

	console.log(`✈️  Iteration #${currentIteration} start`);

	pool.connect().then((client) => {
		let done = () => {
			console.log(`Iteration #${currentIteration} complete 🎊`);
			client.release();
			if (currentIteration < iterations) {
				seedDb();
			}
		};

		let count = 0;

		const stream = client.query(
			copyFrom('COPY comments (project_id,parent_id,author_id,comment_body,created_at) FROM STDIN')
		);

		let lastCommentId, parentId, authorId, projectId, lastProjectId, randomDate, lastDate, randomNum;

		let currentTime = new Date();

		const rs = new Readable({
			read() {
				if (count >= seedCount) {
					rs.push(null);
				} else {
					randomNum = Math.random() * 10;
					authorId = Math.floor(Math.random() * 20000000 + 1);

					if (randomNum > 5 && count > 0) {
						projectId = lastProjectId;
						parentId = lastCommentId;
						randomDate = new Date(
							currentTime.getTime() - Math.random() * (currentTime.getTime() - lastDate.getTime())
						);
					} else {
						projectId = Math.floor(Math.random() * 10000000 + 1);
						lastProjectId = projectId;
						randomDate = faker.date.recent(90);
						lastDate = randomDate;
						parentId = 0;
						lastCommentId = count + 1;
					}

					rs.push(
						projectId +
							'\t' +
							parentId +
							'\t' +
							authorId +
							'\t' +
							faker.lorem.sentences(faker.random.number({ min: 1, max: 7 })) +
							'\t' +
							randomDate.toUTCString() +
							'\n'
					);
					count++;
				}
			}
		});

		let onError = (strErr) => {
			console.error('Something went wrong:', strErr);
			done();
		};

		rs.on('error', onError);
		stream.on('error', onError);
		stream.on('end', done);
		rs.pipe(stream);
	});
};

seedDb();

process.on('exit', () => {
	console.timeEnd('seedTime');
});

               
const seedDb = () => {
  //   db.connect().then((client) => {
  //     let done = () => {
  //       console.log('stream stopped');
  // 			client.release();
  // 			if (counter < iterations) {
  //         seedDb();
  //         counter ++
  // 			}
  // 		};
  
  // 		let count = 0;
  
  // 		const stream = client.query(
  // 			copyFrom(`COPY project ( 
  //         projectTitle,
  //         projectSummary,
  //         projectVideo, 
  //         projectAddress
  //         ) FROM STDIN`)
  // 		);
  // 		const readableStream = new Readable();
  //     let title = faker.commerce.productName()
  //     let summary = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`
  //     let video = `${videos[(Math.floor(Math.random() * videos.length))]}`
  //     let address = `${faker.address.city(1)}, ${faker.address.stateAbbr()}`
  // 		readableStream._read = () => {
  // 			if (count >= seedCount) {
  // 				readableStream.push(null);
  // 			} else {
  //         readableStream.push(`${title}\t${summary}\t${video}\t${address}`)
  //         count++
  // 			}
  // 		};
  
  // 		let onError = (strErr) => {
  // 			console.error('printing str err =>', strErr);
  // 			done();
  // 		};
  
  // 		readableStream.on('error', onError);
  // 		stream.on('error', onError);
  // 		stream.on('end', done);
  // 		readableStream.pipe(stream);
  // // 	});
  
  // seedDb();
  
  // process.on('exit', () => {
  // 	console.timeEnd('seedTime');
  // });
  // }
  

    // counter ++

  // const stream = client.query(
  // copyFrom(`COPY project ( 
  //   projectTitle,
  //   projectSummary,
  //   projectVideo, 
  //   projectAddress
  //   ) FROM STDIN`)
  // )

  // const readableStream = new Readable();
  // readableStream._read = () => {
  //   if (count >= seedCount) {
  //     readableStream.push(null);
  //   } else {
  //     readableStream.push(`${title}\t${summary}\t${video}\t${address}`)
  //     counter ++
  //   }
  // };

  // readableStream.on('error', onError);
  // stream.on('error', onError);
  // stream.on('end', done);
  // readableStream.pipe(stream);

  let commentedOut = {

    // db.connect()
    
    
    
    // const dataGen = () => {
    //   let results = []
    //   // results[0] = (0)
    //   results.push(`${faker.commerce.productName()}`)
    //   results.push((`${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()}`))
    //   results.push(`${videos[(Math.floor(Math.random() * videos.length))]}`)
    //   results.push(`${faker.address.city(1)}, ${faker.address.stateAbbr()}`)
    //   return results
    // }
    
    // let data =  dataGen()
    // console.log('logging data => ', data)
    
    
    // let copyScript = `
    // COPY project ( 
    //   projectTitle,
    //   projectSummary,
    //   projectVideo, 
    //   projectAddress
    //   ) FROM ${data} `
        
    
   
    
        // (async () => {
        //   const seed = await db.query(schema, (err, res) => {
        //     // console.log('logging table creation => ', err, res)
        //     if(!err) console.log('tables created')
        //     else console.log(err)
        //   })
    
        //    db.query(copyScript, (err,res) => {
        //     console.log('logging copy =>', err, res)
        //   })
        // })()
        // const runner = (fucn1, func2) => {
    
        // }
    
       
     
    
    
        
      }  