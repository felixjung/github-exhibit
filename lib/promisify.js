function promisify(fun) {
  return function() {
    const args = Array.from(arguments);

    const promise = new Promise((resolve, reject) => {
      const callback = function(err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      };

      fun.apply(fun, args.concat(callback));
    });

    return promise;
  };
}

function promisifyMethods(object, methods) {
  const methodObject = {};

  methods.forEach(method => {
    methodObject[method] = promisify(object[method]);
  });

  return methodObject;
}

module.exports.promisifyFunction = promisify;
module.exports.promisifyMethods = promisifyMethods;
