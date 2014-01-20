/*
 * auth-token
 * https://github.com/parroit/auth
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

var Promise = require("promise"),
    emailValidation = require('email-validation');


/**
 * This object manage authorization.
 * @param {Object} storage  an AuthStorage instance to use for persistence
 */
function Auth(storage) {
    this.storage = storage;
}

/**
 * Verify user login credential.
 * On success, promise fullfilled value contains property token
 * which is a valid session token.
 * @param  {String} username username to validate
 * @param  {String} password password to validate, in clear form
 * @return a promise that is fullfilled with {valid:true} on success, or {valid:false} on failure.
 *
 */
Auth.prototype.login = function(username, password) {

};

/**
 * Create a user providing bare information.
 * It store new user after performing of these steps:
 *
 * 1. check that username matches `/^\w+$/`
 * 2. check that email is valid
 * 3. it verify that both username and email are unique
 * 4. create a crypto strong random password, and add it to the user object
 * 5. set user status property to `pending`
 * 6. create a crypto strong random confirmation ticket, and add it to the confirmation property
 * @param  {String} username
 * @param  {String} email
 * @return a promise that is fullfilled with {valid:true, confirmation: "the confirmation ticket"}
 * on success, or {valid:false,cause:"the error"} on failure.
 */
Auth.prototype.createUser = function(username, email) {

    function checkInput(resolve) {
        function fail(reason) {
            resolve({
                valid: false,
                reason: reason
            });
            return false;
        }

        if (!/^\w+$/.test(username)) {
            return fail("invalid username");
        }

        if (!emailValidation.valid(email)) {
            return fail("invalid email");
        }


        return true;
    }



    return new Promise(function(resolve, reject) {
        if (!checkInput(resolve)) {
            return;
        }


    });
};

/**
 * Start destroy of a user.
 * It perform following steps:
 *
 * 1. check that session token is a valid one
 * 2. check that username who own the token exists
 * 3. check that user status is `confirmed`
 * 2. set user status property to `destroy-requested`
 * 6. create a crypto strong random confirmation ticket, and add it to the confirmation property
 * 7. send an email to the user address, including the confirmation
 * @param  {String} sessionToken 	a valid session token. it must be owned by user we want to destroy
 * @return a promise that is fullfilled with {valid:true, confirmation: "the confirmation ticket"}
 * on success, or {valid:false,cause:"the error"} on failure.
 */
Auth.prototype.destroyUser = function(sessionToken) {

};

/**
 * Confirm a user destroy.
 * It destroy user from storage after performing of these steps:
 *
 * 1. check that session token is a valid one
 * 2. check that username who own the token exists
 * 3. check that user status is `destroy-requested`
 * 4. verify that `confirmationTicket` is equal to that saved on user object
 *
 * @param  {String} sessionToken 	a valid session token. it must be owned by user we want to destroy
 * @param  {String} confirmationTicket confirmation ticket issued by a call to `destroyUser`
 *
 * @return a promise that is fullfilled with {valid:true, password: "the user pasword"}
 * on success, or {valid:false,cause:"the error"} on failure.
 */
Auth.prototype.confirmDestroyUser = function(sessionToken, confirmationTicket) {

};



/**
 * Confirm a user creation.
 * It store modified user on storage after performing of these steps:
 *
 * 1. check that user exists with provided username
 * 2. check that user status is `pending`
 * 3. verify that `confirmationTicket` is equal to that saved on user object
 * 4. change user status to `confirmed`
 * 5. delete user confirmation ticket
 *
 * @param  {String} username
 * @param  {String} confirmationTicket confirmation ticket issued by a call to `createUser`
 *
 * @return a promise that is fullfilled with {valid:true, password: "the user pasword"}
 * on success, or {valid:false,cause:"the error"} on failure.
 */
Auth.prototype.confirmUser = function(username, confirmationTicket) {

};



module.exports = Auth;