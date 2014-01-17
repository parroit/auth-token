

<!-- Start lib\auth-storage.js -->

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

<!-- End lib\auth-storage.js -->

