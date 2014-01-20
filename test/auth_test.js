"use strict";

var expect = require("expect.js"),
	Auth = require("../lib/auth"),
	AuthStorage = require("./test-auth-storage");



describe("Auth", function() {
	var storage = new AuthStorage(),
		auth = new Auth(storage);

	it("is defined", function() {
		expect(Auth).to.be.an("function");
	});

	it("it is instantiable", function() {
		expect(auth).to.be.an("object");
	});


	describe("createUser", function() {
		function itReject(description, user, email, expectedError) {
			it(description, function(done) {
				auth.createUser(user, email)

				.then(function(result) {
					expect(result.valid).to.be.equal(false);
					expect(result.reason).to.be.equal(expectedError);
					done();
				})

				.then(null, function(err) {
					console.log(err.stack)
				});

			});
		}

		itReject("reject non alphanumeric username", "?", "pwd", "invalid username");
		itReject("reject empty username", "", "pwd", "invalid username");
		itReject("reject empty email", "giovanni", "", "invalid email");
		itReject("reject wrong email", "giovanni", "pwd", "invalid email");



	});

});