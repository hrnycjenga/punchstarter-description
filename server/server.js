var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const {getParagraphInfo, getPicturesInfo, getProjectInfo} = require('./controller/controllerPostgres.js')

const cache = require('memory-cache')
let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if(cacheContent){
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key,body,duration*1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

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
app.get('/main', cacheMiddleware(30), getProjectInfo)
app.get('/paragraph', cacheMiddleware(30), getParagraphInfo)
app.get('/pictures', cacheMiddleware(30), getPicturesInfo)
app.use('/:id', cacheMiddleware(30), express.static(path.join(__dirname, '../client/dist')));

app.get('/', function(req, res) {
  res.json({message: "Must add product ID to the URL", example: 'www.hackstarter.com/35'});
})

var port = process.env.PORT || 3013;
app.listen(port, function () {
  console.log('Listening on ' + port + '!');
})