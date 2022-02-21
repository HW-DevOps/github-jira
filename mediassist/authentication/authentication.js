'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const routes = require('./routes')
const db = require('./database/DatabaseConfiguration.js');
const format = require('string-format')
const _ = require('underscore');
format.extend(String.prototype, {})
// Express configuration
const app = express();

app.use(cookieParser());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());

app.use('/',routes);

app.listen(process.env.PORT || 5000);

module.exports = app;


