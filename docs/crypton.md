

<!-- Start lib/crypton.js -->

auth-token
https://github.com/parroit/auth

Copyright (c) 2014 Andrea Parodi
Licensed under the MIT license.

## makeHash(password)

This function allows to create a password hash.

### Params: 

* **String** *password* 

### Return:

* **md5** hash of password

## mkPwd()

Create a cryptografic strong random password

### Return:

* **String** the generated password

## mkID()

Create a cryptografic strong id

### Return:

* **String** the generated id

## verifySessionToken(token, keyPath)

This function verify authenticity of a session token.

### Params: 

* **String** *token* the token to verify

* **String** *keyPath* path of a public key in PEM format

### Return:

* **true** if token authenticity is proved, false otherwise

## makeSessionToken(username, expirationMinutes, keyPath, now)

This function allows to create a session token for a user.

### Params: 

* **String** *username* 

* **Number** *expirationMinutes* the token expire within this number of minutes

* **String** *keyPath* path of a private key in PEM format

* **Number** *now* millisecond from epoch to use as creation time. Defaults to actual time. Mainly used for tests

### Return:

* **a** new session token

<!-- End lib/crypton.js -->

