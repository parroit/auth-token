

<!-- Start lib/auth.js -->

auth
https://github.com/parroit/auth

Copyright (c) 2014 Andrea Parodi
Licensed under the MIT license.

## makeHash(password)

This function allows to create a password hash.

### Params: 

* **(String)** *password* 

### Return:

* **md5** hash of password

## verifySessionToken(username)

This function verify authenticity of a session token.

### Params: 

* **(String)** *username* 

### Return:

* **true** if token authenticity is proved, false otherwise

## makeSessionToken(username, expirationMinutes, keyPath, now)

This function allows to create a session token for a user.

### Params: 

* **(String)** *username* 

* **(Number)** *expirationMinutes* - the token expire within this number of minutes

* **(String)** *keyPath* - path of a private key in PEM format

* **(Number)** *now* - millisecond from epoch to use as creation. Defaults to actual time. Mainly used for tests 

### Return:

* **a** new session token

## Auth(storage)

This object manage authorization.

### Params: 

* **(Object)** *storage* - an AuthStorage instance to use for persistence

## login()

Verify user login credential.

### Return:

* **a** promise that is fullfilled with {valid:true}

<!-- End lib/auth.js -->

<!-- Start lib/auth-storage.js -->

auth
https://github.com/parroit/auth

Copyright (c) 2014 Andrea Parodi
Licensed under the MIT license.

## AuthStorage(options)

This object allows to manage users
within storage.

### Params: 

* **Object** *options* - configuration options for object

## saveUser(user)

Save a user into storage.

### Params: 

* **Object** *user* - the user object to save

### Return:

* **Promise** a promise fullfilled with {status: &quot;ok&quot;}

## getUser(username)

Retrieve a user from storage by name.

### Params: 

* **String** *username* - the username of the user to retrieve

### Return:

* **Promise** a promise fullfilled with user object

## removeUser(user)

Remove a user from storage.

### Params: 

* **Object** *user* - the user object to save

### Return:

* **Promise** a promise fullfilled with {status: &quot;ok&quot;}

<!-- End lib/auth-storage.js -->

