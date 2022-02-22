'use strict';
//=> import external modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const format = require('string-format')
format.extend(String.prototype, {})

const routes = require('./routes/wards')
const mongoose = require('./config/database')

// Express configuration
const app = express();

app.use(cookieParser());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());

app.use('/wards',routes);

const PORT = process.env.PORT || 7000;


let db = mongoose.connect()
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(PORT, ()=> {
        console.log("Ward Registration is running on port: "+PORT);
    });
});


module.exports = app;


