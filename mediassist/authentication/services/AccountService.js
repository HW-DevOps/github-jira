'use strict'

const accountDBService =  require('../database/AccountDBService')
const format = require('string-format')
const _ = require('underscore')
format.extend(String.prototype, {});
const utils = require('../utils')



/**
 *
 * @param user
 * @returns {Promise<void>}
 */
function create(user,callback){
    user.password = utils.sha256(user.password);
    accountDBService.get(user).then(function (result) {
        callback({error: "User already exist"});
    },function (err) {
        if(err) {
            console.error(err)
            accountDBService.create(user).then(function (result) {
                callback(null, {result: "User created"});
            }, function (err) {
                callback({error: "User creation failed"});
            })
        } else {
            callback({error : "undefined error"})
        }

    });

}

/**
 *
 * @param user
 * @param callback
 */
function update(user,callback){
    if(user.password) {
        user.password = utils.sha256(user.password);
    }
    accountDBService.update(user).then(function (result) {
            callback(null, {result: "User information updated."});
        }, function (err) {
            console.error(err);
            callback({error: "User update failed."});
        });
    }


/**
 *
  * @param user
 * @param callback
 */
function get(user,callback){
    accountDBService.get(user).then(function (result) {
        callback(null, result);
    },function (err) {
        console.log(err);
        callback({error: "User information doesnot exist"});
    });
}


module.exports = {create,update,get}

