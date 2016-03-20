'use strict';

// NPM MODULES
const Github = require('github-api');
const _ = require('lodash');

// MODULE IMPLEMENTATION
const routers = _.values(require('./routers'));

module.exports = function(config) {
  const accessToken = config.accessToken;
  const github = new Github({ token: accessToken, auth: 'oauth' });

  const githubExhibit = {
    context: github,
    routers
  };

  return githubExhibit;
};
