'use strict';

const accountDBService = require('../database/AccountDBService');
const tokenDBService = require('../database/TokenDBService')
const utils = require('../utils')
const format = require('string-format')
const _ = require('underscore')
const async = require('async')
format.extend(String.prototype, {})
const { v4: uuidv4 } = require('uuid');


/**
 *
 * @param user
 */
function validate(user){
    return new Promise(function(resolve, reject) {
        async.waterfall([
            async.apply(fetchUser, user),
            validatePassword,
            saveToken
        ], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}

/**
 *
 * @param user
 * @param callback
 */
function fetchUser(user, callback) {
    accountDBService.get(user).then(function (result) {
        callback(null,user, result)
    },function (err) {
        callback(err);
    });
}


/**
 *
 * @param user
 * @param dbUser
 * @param callback
 */
function validatePassword(user, dbUser, callback) {
    console.log("user -->" , user);
    console.log("dbuser -->", dbUser);
    console.log("dbPassword --> ",utils.sha256(user.password) );
    if(utils.sha256(user.password) == dbUser.password){
        callback(null, dbUser);
    } else {
        callback({error: "Invalid Credentials"});
    }
}


/**
 *
 */
function saveToken(dbUser, callback){
    let token_data =
        {
            username : dbUser.username,
            token : uuidv4().toLowerCase()
        };

    tokenDBService.upsert(token_data).then(function(result){
        callback(null, token_data, result)
        },function(err){
        console.log('err -', err)
        callback(err);
    })
}

module.exports = { validate , fetchUser}
