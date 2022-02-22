'use strict';
//=> import external modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const format = require('string-format')
const _ = require('underscore');

format.extend(String.prototype, {})
// Express configuration
const app = express();

app.use(cookieParser());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());

//=> This is where we handle api calls
const routes = require('./routes/patients')
//=> creates instance of our atlas mongo db
const {MONGO_DB_URI} = require("./config/databaseuri");
const mongoose = require("mongoose");
mongoose.connect(MONGO_DB_URI);

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());

//route all api calls to router
app.use('/',routes);
const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=> {
    console.log("Patient Registration is running on port: "+PORT);
});
module.exports = app;


