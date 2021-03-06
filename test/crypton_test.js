"use strict";

var expect = require("expect.js"),
	crypton = require("../lib/crypton");


describe("crypton", function() {
	it("is defined", function() {
		expect(crypton).to.be.an("object");
	});


	describe("makeHash", function() {
		it("is defined", function() {
			expect(crypton.makeHash).to.be.an("function");
		});

		it("return a base64 hash", function() {
			var hash = crypton.makeHash("ciao");
			expect(hash).to.be.equal("bmvE5J3Ud+vJjvQEbAZ7Xw==");
		});
	});

	describe("mkPwd", function() {
		var pwd = crypton.mkPwd();

		it("is defined", function() {
			expect(crypton.mkPwd).to.be.an("function");
		});

		it("return a string", function() {

			expect(pwd).to.be.a("string");
		});

		it("return different password each time", function() {
			var pwds = {},
				i = 0,
				times = process.env.TOKEN_RETRY;

			for (; i < times; i++) {
				var pwd = crypton.mkPwd();

				expect(pwds[pwd]).to.be.equal(undefined);
				pwds[pwd] = true;
			}
		});

	});

	describe("mkID", function() {
		var id = crypton.mkID();

		it("is defined", function() {
			expect(crypton.mkID).to.be.an("function");
		});

		it("return a string", function() {

			expect(id).to.be.a("string");
		});

		it("return different password each time", function() {
			var ids = {},
				i = 0,
				times = process.env.TOKEN_RETRY;

			for (; i < times; i++) {
				var id = crypton.mkID();
				expect(ids[id]).to.be.equal(undefined);
				ids[id] = true;
			}
		});

	});

	describe("makeSessionToken", function() {
		it("is defined", function() {
			expect(crypton.makeSessionToken).to.be.an("function");
		});

		it("return a base64 token", function() {
			var token = crypton.makeSessionToken("parroit", 10, "test/keys/rsa_priv.pem");

			expect(token.length).to.be.greaterThan(300);
		});

		it("return a different token each time", function() {
			var tokens = {},
				i = 0,
				l = process.env.TOKEN_RETRY;

			for (; i < l; i++) {
				var token = crypton.makeSessionToken("parroit", 10, "test/keys/rsa_priv.pem");
				expect(token in tokens).to.be.equal(false);
				tokens[token] = true;
			}

		});
	});

	describe("verifySessionToken", function() {
		it("is defined", function() {
			expect(crypton.verifySessionToken).to.be.an("function");
		});

		it("return true on valid token", function() {
			var token = crypton.makeSessionToken("parroit", 10, "test/keys/rsa_priv.pem");

			var result = crypton.verifySessionToken(token, "test/keys/rsa_pub.pem");

			expect(result)
				.to.be.equal(true);


		});

		it("return false on expired token", function() {
			var now = (new Date().getTime()) - 60000 * 2;

			var token = crypton.makeSessionToken("parroit", 1, "test/keys/rsa_priv.pem", now);

			var result = crypton.verifySessionToken(
				token,
				"test/keys/rsa_pub.pem"
			);

			expect(result)
				.to.be.equal(false);


		});

		it("return false on invalid token", function() {
			var token = crypton.makeSessionToken("parroit", 10, "test/keys/rsa_priv.pem");

			var result = crypton.verifySessionToken(
				token.replace(/parroit/g, "beep-boop"),
				"test/keys/rsa_pub.pem"
			);

			expect(result)
				.to.be.equal(false);


		});
	});
});