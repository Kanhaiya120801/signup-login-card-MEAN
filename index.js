var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');

const config= require('./middleware/config');

const url = config.MongoURL;
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
connect .then(() => {
  console.log('Database Connection Successfull...!');
}).catch((err) => {
  console.log("Database Connetion Fali...!");
});

var app = express();
app.use(cors());


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.json());


app.use('/api/route', require('./routes/route'))

var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})