'use strict';

// NPM MODULES
const Github = require('github-api');
const _ = require('lodash');

// MODULE IMPLEMENTATION
const routers = _.values(require('./routers'));

module.exports = function(config) {
  const accessToken = config.accessToken;

  if (!accessToken) {
    const errorMsg = 'Cannot initiate exhibit github. Access token missing.';
    throw new TypeError(errorMsg);
  }

  const github = new Github({ token: accessToken, auth: 'oauth' });

  const githubExhibit = {
    context: github,
    routers
  };

  return githubExhibit;
};
