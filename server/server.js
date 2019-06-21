var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const {getParagraphInfo, getPicturesInfo, getProjectInfo} = require('./controller/controllerPostgres.js')


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
app.get('/main',  getProjectInfo)
app.get('/paragraph', getParagraphInfo)
app.get('/pictures', getPicturesInfo)
app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/', function(req, res) {
  res.json({message: "Must add product ID to the URL", example: 'www.hackstarter.com/35'});
})

var port = process.env.PORT || 3013;
app.listen(port, function () {
  console.log('Listening on ' + port + '!');
})