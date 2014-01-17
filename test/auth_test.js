'use strict';

var expect = require("expect.js");
var auth = require("../lib/auth");


describe("auth", function () {
    it("is defined", function () {
        expect(auth).to.be.an('object');
    });
});
