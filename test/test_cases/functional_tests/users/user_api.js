/* eslint-disable no-undef */
const request = require("supertest");
const assert = require("assert");
const nock = require("nock");
const USER_INFO_MOCK = require("../../constants/user_info.json");
const USER_REPOSITORIES_INFO = require("../../constants/user_repos_info.json");

describe("USER - API", function () {
  let app;

  before(() => {
    app = require("../../../../src/app");
  });

  it("Get user Info", function (done) {
    nock(process.env.axios_url)
      .get("/users/deivisondfs2")
      .reply(200, USER_INFO_MOCK);

    request(app)
      .get("/user/info/deivisondfs2")
      .timeout(20000)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const json = JSON.parse(res.text);
        assert.equal(json.login, "deivisondfs2");
        assert.equal(json.id, 16122029);
        assert.equal(json.name, "Deivison Francisco TEST CHANGE FILE");
        return done();
      });
  });

  it("Get repos from user Info", function (done) {
    nock(process.env.axios_url)
      .get("/users/deivisondfs2/repos")
      .reply(200, USER_REPOSITORIES_INFO);

    request(app)
      .get("/user/info/deivisondfs2/repo")
      .timeout(20000)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const json = JSON.parse(res.text);
        assert.equal(json.length, 27, "Expected 27 repos");
        const web = json[0];
        assert.equal(web.id, 47772257);
        assert.equal(web.name, "ambiente-php-vagrant");
        return done();
      });
  });
});
