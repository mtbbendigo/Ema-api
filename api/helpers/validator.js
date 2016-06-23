/**
 * Created by adm9360 on 21/06/2016.
 */

var uns = require("underscore");

module.exports = {validator: isValidString};

function isValidString(str){
    if(str !== undefined && uns.isString(str)){
        return uns.isEmpty(str);
    }
}