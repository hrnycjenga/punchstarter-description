var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// Creating an express application
var app = express();

// Using middlewares

app.use(express.static('/:id', path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

//routes
const routes = require('./router/router.js');
app.use('', routes);

// app.get('', function(req, res) {
//   res.json({message: "Must add product ID to the URL", example: 'www.hackstarter.com/35'});
// })

var port = 3013;
app.listen(port, function () {
  console.log('Listening on localhost: ' + port);
});