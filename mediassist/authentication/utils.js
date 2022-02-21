const crypto = require('crypto');
const propertiesReader = require('properties-reader');
const properties = propertiesReader('db.properties');


/***
 *
 * @returns {PromiseLike<ArrayBuffer>}
 */
sha256 = function hash(password) {
    try {
        const salt = properties.get("salt");
        var hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest('hex');
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    sha256
}

