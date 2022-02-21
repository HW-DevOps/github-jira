
const database =  require('../database/DatabaseConfiguration')
const format = require('string-format')
format.extend(String.prototype, {})
const users_collection = "users";


/**
 *
 * @param user
 * @returns {Promise<unknown>}
 */
async function create(user){
    return new Promise( function (resolve , reject) {
        database.create().then(function (client) {
            let mdbu = client.db('MDBU');
            const collection = mdbu.collection(users_collection);
          //  const options = { ordered: true };
            console.log(user);
            collection.insertOne(user, function (err, result) {
                client.close();
                if(err){
                    reject(err);
                } else {
                    console.log(`${result.insertedCount} documents were inserted`);
                    resolve(result);
                }
            });
        })
    });
}


/**
 *
 * @param user
 * @returns {Promise<unknown>}
 */
 function get(user){
    return new Promise( function (resolve , reject) {
        database.create().then(function (client) {
            let mdbu = client.db('MDBU');
            const collection = mdbu.collection(users_collection);
            console.log(user);
            collection.findOne({username : user.username},function(err, result) {
                client.close();
                if(err){
                    reject(err)
                } else {
                    console.log(' result --> ', result);
                    if(result) {
                        resolve(result);
                    } else {
                        reject({error : "no record"});
                    }
                }
            });
        })

    })

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
                if (err) {
                    reject(err)
                }
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
function upsert(user){
    return new Promise(function (resolve , reject) {
        try {
            update(user).then(function(result){
                resolve(result);
            },function (err){
                throw Error(err);
            })
        } catch(exception) {
            console.log(exception);
             create(user).then(function(result){
                resolve(result)
             },function (err) {
                reject(err);
             });
        }
    });

}

module.exports = {create,get,update,upsert}
