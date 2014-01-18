

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

## createUser()

Create a user providing bare information.
It store new user after performing of these steps:

1. check that username matches `/^\s+$/`
2. check that email is valid
3. it verify that both username and email are unique
4. create a crypto strong random password, and add it to the user object
5. set user status property to `pending`
6. create a crypto strong random confirmation ticket, and add it to the confirmation property
7. send an email to the user address, including the confirmation

### Return:

* **a** promise that is fullfilled with {valid:true, confirmation: &quot;the confirmation ticket&quot;}

## confirmUser()

Confirm a user creation.
It store modified user on storage after performing of these steps:

1. check that user exists with provided username
2. check that user status is `pending`
3. verify that `confirmationTicket` is equal to that saved on user object
4. change user status to `confirmed`
5. delete user confirmation ticket

### Return:

* **a** promise that is fullfilled with {valid:true, password: &quot;the user pasword&quot;}

<!-- End lib/auth.js -->
