'use strict';

const Router = require('koa-router');

const User = require('../lib/user');

const router = new Router({ prefix: '/user' });

router.get('/', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let info = yield user.info().then(
    info => info,
    err => err
  );

  this.body = info;
});

router.get('/orgs', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let orgs = yield user.orgs().then(
    info => info,
    err => err
  );

  this.body = orgs;
});

router.get('/repos', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  const options = {
    type: 'owner'
  };

  let repos = yield user.repos(options).then(
    info => info,
    err => err
  );

  this.body = repos;
});

router.get('/gists', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let gists = yield user.gists().then(
    info => info,
    err => err
  );

  this.body = gists;
});

module.exports = router;
