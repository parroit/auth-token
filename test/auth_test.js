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
					console.log(err.stack);
				});

			});
		}

		itReject("reject non alphanumeric username", "?", "a@b.c", "invalid username");
		itReject("reject empty username", "", "a@b.c", "invalid username");
		itReject("reject null username", null, "a@b.c", "invalid username");
		itReject("reject undefined username", undefined, "a@b.c", "invalid username");
		itReject("reject non string username", {}, "a@b.c", "invalid username");

		itReject("reject empty email", "giovanni", "", "invalid email");
		itReject("reject wrong email", "giovanni", "pwd", "invalid email");
		itReject("reject null email", "giovanni", null, "invalid email");
		itReject("reject undefined email", "giovanni", undefined, "invalid email");
		itReject("reject non string email", "giovanni", {}, "invalid email");

		it("accept valid username and email", function(done) {
			auth.createUser("giovanni", "a@b.c")

			.then(function(result) {
				expect(result.valid).to.be.equal(true);
				expect(result.reason).to.be.equal(undefined);
				done();
			})

			.then(null, function(err) {
				console.log(err.stack);
			});

		});

		describe("saved user", function() {
			var user;

			before(function(done) {

				storage.getUser("giovanni").then(function(usr) {
					user = usr;
					console.dir(user);
					done();
				});
			});

			it("exists", function() {
				expect(user).to.be.a("object");

			});

			it("has correct username", function() {
				expect(user.username).to.be.equal("giovanni");

			});

			it("has correct email", function() {
				expect(user.email).to.be.equal("a@b.c");

			});

			it("has password", function() {
				expect(user.password).to.be.a("string");
				expect(user.password.length).to.be.equal(10);

			});

			it("has pending status", function() {
				expect(user.status).to.be.equal("pending");

			});
		});



	});

});