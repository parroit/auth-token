/*
 * auth
 * https://github.com/parroit/auth
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

"use strict";

var crypto = require("crypto");

/**
 * This function allows to create a password hash.
 * @param (String) password
 * @return md5 hash of password
 */
function makeHash(password){
	return crypto
		.createHash("md5")
		.update(password)
		.digest("base64");
}

/**
 * This function verify authenticity of a session token.
 * @param (String) username
 * @return true if token authenticity is proved, false otherwise
 */
function verifySessionToken(token, keyPath){
	var crypto = require("crypto"),
		fs = require("fs"),
		
		pem = fs.readFileSync(keyPath),
		key = pem.toString("ascii"),
		
		sign = crypto.createVerify("RSA-SHA256"),
		
		tkParts = token.split(/-/g),

		username = tkParts[0],
		sessionId = tkParts[1],
		creation = tkParts[2],
		expirationMs = tkParts[3],
		sig = tkParts[4]
		
		;


	sign.update(username);
	sign.update(sessionId);
	sign.update(creation);  
	sign.update(expirationMs);

	return sign.verify(key,sig, "hex");
}

/**
 * This function allows to create a session token for a user.
 * @param (String) username
 * @return a new session token
 */
function makeSessionToken(username,expirationMinutes,keyPath){
	var crypto = require("crypto"),
		fs = require("fs"),
		uuid = require("node-uuid"),

		pem = fs.readFileSync(keyPath),
		key = pem.toString("ascii"),
		
		sign = crypto.createSign("RSA-SHA256"),
		creation = String(new Date().getTime()),
		expirationMs = String(expirationMinutes * 60000),
		
		sessionId = uuid.v4().replace(/-/g,"");

	sign.update(username);
	sign.update(sessionId);
	sign.update(creation);  
	sign.update(expirationMs);

	var sig = sign.sign(key, "hex");
	return [username, sessionId, creation, expirationMs, sig].join("-");
}

/**
 * This object manage authorization.
 * @param (Object) storage - an AuthStorage instance to use for persistence
 */
function Auth(storage){
	this.storage = storage;	
}

/**
 * Verify user login credential.
 * @return a promise that is fullfilled with {valid:true}
 * on success, or {valid:false} on failure.
 * On success, returned value also contains property token
 * which contains a session token.	
 */
Auth.prototype.login = function(username,password) {

};



module.exports = {
	makeHash: makeHash,
	makeSessionToken: makeSessionToken,
	verifySessionToken: verifySessionToken,
	Auth: Auth
};