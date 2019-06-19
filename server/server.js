var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const {getParagraphInfo, getPicturesInfo, getProjectInfo} = require('./controller/controllerPostgres.js')
const fs = require('fs')
const loaderToken = require('./loaderio-8818b50c31e6b903d28cf61ce1b9a92b.txt')
const tokenRead = fs.readFile(loaderToken, 'utf8', (err, data) => {
  if(err) throw err
  else return data
})
// Creating an express application
var app = express();  

// Using middlewares
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

//routes
const routes = require('./router/router.js');
// app.use('/', routes);
app.get('/loaderio-8818b50c31e6b903d28cf61ce1b9a92b', tokenRead)
app.get('/main', getProjectInfo)
app.get('/paragraph', getParagraphInfo)
app.get('/pictures', getPicturesInfo)
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/', function(req, res) {
  console.log('logging in app get =>')
  res.json({message: "Must add product ID to the URL", example: 'www.hackstarter.com/35'});
})

var port = process.env.PORT || 3013;
app.listen(port, function () {
  console.log('Listening on ' + port + '!');
})