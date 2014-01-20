

<!-- Start lib/auth.js -->

## Promise

auth-token
https://github.com/parroit/auth

Copyright (c) 2014 Andrea Parodi
Licensed under the MIT license.

## Auth(storage)

This object manage authorization.

### Params: 

* **Object** *storage* an AuthStorage instance to use for persistence

## login(username, password)

Verify user login credential.
On success, promise fullfilled value contains property token
which is a valid session token.

### Params: 

* **String** *username* username to validate

* **String** *password* password to validate, in clear form

### Return:

* **a** promise that is fullfilled with {valid:true} on success, or {valid:false} on failure.

## createUser(username, email)

Create a user providing bare information.
It store new user after performing of these steps:

1. check that username matches `/^\w+$/`
2. check that email is valid
3. it verify that both username and email are unique
4. create a crypto strong random password, and add it to the user object
5. set user status property to `pending`
6. create a crypto strong random confirmation ticket, and add it to the confirmation property

### Params: 

* **String** *username* 

* **String** *email* 

### Return:

* **a** promise that is fullfilled with {valid:true, confirmation: &quot;the confirmation ticket&quot;}

## destroyUser(sessionToken)

Start destroy of a user.
It perform following steps:

1. check that session token is a valid one
2. check that username who own the token exists
3. check that user status is `confirmed`
2. set user status property to `destroy-requested`
6. create a crypto strong random confirmation ticket, and add it to the confirmation property
7. send an email to the user address, including the confirmation

### Params: 

* **String** *sessionToken* 	a valid session token. it must be owned by user we want to destroy

### Return:

* **a** promise that is fullfilled with {valid:true, confirmation: &quot;the confirmation ticket&quot;}

## confirmDestroyUser(sessionToken, confirmationTicket)

Confirm a user destroy.
It destroy user from storage after performing of these steps:

1. check that session token is a valid one
2. check that username who own the token exists
3. check that user status is `destroy-requested`
4. verify that `confirmationTicket` is equal to that saved on user object

### Params: 

* **String** *sessionToken* 	a valid session token. it must be owned by user we want to destroy

* **String** *confirmationTicket* confirmation ticket issued by a call to `destroyUser`

### Return:

* **a** promise that is fullfilled with {valid:true, password: &quot;the user pasword&quot;}

## confirmUser(username, confirmationTicket)

Confirm a user creation.
It store modified user on storage after performing of these steps:

1. check that user exists with provided username
2. check that user status is `pending`
3. verify that `confirmationTicket` is equal to that saved on user object
4. change user status to `confirmed`
5. delete user confirmation ticket

### Params: 

* **String** *username* 

* **String** *confirmationTicket* confirmation ticket issued by a call to `createUser`

### Return:

* **a** promise that is fullfilled with {valid:true, password: &quot;the user pasword&quot;}

<!-- End lib/auth.js -->

