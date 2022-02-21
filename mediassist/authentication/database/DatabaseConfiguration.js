const propertiesReader = require('properties-reader');
const properties = propertiesReader('db.properties');
const {MongoClient} = require('mongodb')

/**
 * This is method to initialise different types of DB.
 * @type {{start: start, client: null, initialise: initialise}}
 */
var db  = module.exports  = {
    client : null,
    create : async function(){
            var placeHolder = {username : properties.get('username'),password :
            properties.get('password'),db_name : properties.get('db_name')};
            var uri = properties.get('uri');
            uri = uri.format(placeHolder);
            const client = new MongoClient(uri,{ useUnifiedTopology: true });
            try {
                // Connect to the MongoDB cluster
                await client.connect();
                return client;
            } catch (e) {
                console.error(e);
                throw new Error (e);
            }
        },
    close : async function(){
        await db.client.close();
    },initialise:async function (type){
        if(type == 'mongodb'){
            await db.start();
        }
    }
};

