const propertiesReader = require('properties-reader');
const mongoose = require("mongoose");
const properties = propertiesReader("db_credentials.properties");
let MONGO_DB_URI = properties.get('uri').format({
    username : properties.get('username'),
    password : properties.get('password'),
    db_name : properties.get('db_name')
});

/**
 * override from env path.
 */
if(process.env.MONGO_DB_URI) {
    MONGO_DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
    url : MONGO_DB_URI,
    connect : function () {
        mongoose.connect(MONGO_DB_URI,{ useUnifiedTopology: true });
        return mongoose.connection;
    }
}
