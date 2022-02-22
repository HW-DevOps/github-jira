const propertiesReader = require('properties-reader');
const properties = propertiesReader("db_credentials.properties");
let MONGO_DB_URI = properties.get('uri').format({
    username : properties.get('username'),
    password : properties.get('password'),
    db_name : properties.get('db_name')
});

if(process.env.MONGO_DB_URI) {
    MONGO_DB_URI = process.env.MONGO_DB_URI;
}
module.exports = {
    MONGO_DB_URI
}
