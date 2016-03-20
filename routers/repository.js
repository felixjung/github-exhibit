'use strict';

const _ = require('lodash');

const Router = require('koa-router');

const User = require('../lib/user');
const Repo = require('../lib/repository');

const router = new Router({ prefix: '/repository' });

router.get('/:repo', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let username = yield user.info().then(
    info => info.login,
    err => err
  );

  const repo = new Repo(github, username, this.params.repo);

  const repoInfo = yield repo.show().then(
    info => info,
    err => err
  );

  const filteredRepoInfo = _.pick(
    repoInfo,
    ['full_name', 'html_url', 'description', 'created_at', 'updated_at',
      'pushed_at', 'git_url', 'ssh_url', 'clone_url', 'svn_url', 'homepage',
      'size', 'watchers_count', 'language', 'stargazers_count', 'forks_count',
      'has_wiki', 'has_issues', 'open_issues', 'wrachers', 'default_branch',
      'network_count', 'subscribers_count'
    ]
  );

  this.body = filteredRepoInfo;
});

router.get('/:repo/pulls', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let username = yield user.info().then(
    info => info.login,
    err => err
  );

  const repo = new Repo(github, username, this.params.repo);

  const pullRequests = yield repo.listPulls('open').then(
    response => response,
    err => err
  );

  this.body = pullRequests;
});

router.get('/:repo/branches', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let username = yield user.info().then(
    info => info.login,
    err => err
  );

  const repo = new Repo(github, username, this.params.repo);

  const branches = yield repo.listBranches().then(
    response => response,
    err => err
  );

  this.body = branches;
});

router.get('/:repo/forks', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let username = yield user.info().then(
    info => info.login,
    err => err
  );

  const repo = new Repo(github, username, this.params.repo);

  const forks = yield repo.listForks().then(
    response => response,
    err => err
  );

  this.body = forks;
});

router.get('/:repo/issues', function *() {
  const github = this.app.context.github;
  const user = new User(github);

  let username = yield user.info().then(
    info => info.login,
    err => err
  );

  const repo = new Repo(github, username, this.params.repo);

  const issues = yield repo.listIssues({}).then(
    response => response,
    err => err
  );

  this.body = issues;
});

module.exports = router;

