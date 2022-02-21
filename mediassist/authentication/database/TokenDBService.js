'use strict';


const database =  require('../database/DatabaseConfiguration')

const format = require('string-format')
format.extend(String.prototype, {})
const users_collection = "tokens";



/**
 *
 * @param user
 * @returns {Promise<unknown>}
 */

function create(user) {
    return new Promise(function (resolve, reject) {
        database.create().then(function (client) {
            let mdbu = client.db('MDBU');
            const collection = mdbu.collection(users_collection);
            console.log(user);
            collection.insertOne(user, function (result) {
                resolve(result);
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
    });
}


/**
 *
 * @param user
 * @returns {Promise<unknown>}
 */
 function get(user) {
    return new Promise(function (resolve, reject) {
        database.create().then(function (client) {
            let mdbu = client.db('MDBU');
            const collection = mdbu.collection(users_collection);
            console.log(user);
            collection.findOne({username : user.username},function(err, result) {
                client.close();
                if (err) {
                    reject(err)
                }
                console.log(`${result.insertedCount} documents were inserted`);
                resolve(result);
            });
        });
    });
}


/**
 *
 * @param user
 * @returns {Promise<unknown>}
 */
 function update(update_user) {
    return new Promise(function (resolve, reject) {
        database.create().then(function (client) {
            let mdbu = client.db('MDBU');
            const collection = mdbu.collection(users_collection);
            let current_user = {username: update_user.username};
            let newvalues = { $set: update_user };
            collection.updateOne(current_user, newvalues,function (err, result) {
                client.close();
                if (err || result.modifiedCount == 0) {
                    reject(err);
                } else {
                    resolve({results :  "Token updated"});
                }
            });
        });
    });
}

/**
 *
 * @param user
 * @returns {Promise<unknown>}
 */
function upsert(user) {
    return new Promise(function (resolve, reject) {
        try {
            user.createdAt = new Date();
            update(user).then(function (result) {
                //console.log('update result ', result);
                resolve(result);
            }, function (err) {
                console.log('token doesnt exist ',err);
                create(user).then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        } catch (exception) {
            console.log(exception);
            reject(exception);
        }
    });
}


module.exports = {create,get,update,upsert}
