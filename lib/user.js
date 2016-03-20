'use strict';

// NPM MODULES
const _ = require('lodash');
const promisify = require('./promisify').promisifyMethods;

// User class
class User {
  constructor (github) {
    const _this = this;
    const githubUser = github.getUser();

    // Promisify and add specific methods of github user.
    const methods = ['show', 'repos', 'orgs', 'gists'];
    _.defaults(_this, promisify(githubUser, methods));
  }

  info() {
    return this.show('');
  }
}

module.exports = User;
