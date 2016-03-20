const _ = require('lodash');

function promisify(fun) {
  return function() {
    const args = Array.from(arguments);

    const promise = new Promise((resolve, reject) => {
      const callback = function(err, data) {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      };

      fun.apply(fun, args.concat(callback));
    });

    return promise;
  };
}

function promisifyMethods(object, methods) {
  methods = methods || _.functions(object);
  const methodObject = _.pick(object, methods);

  return _.mapValues(methodObject, promisify);
}

module.exports.promisifyFunction = promisify;
module.exports.promisifyMethods = promisifyMethods;
