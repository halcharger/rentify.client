(function () {
  'use strict';

  function controller($http, $q, authService, configuration, DSCacheFactory) {
    var factory = {};

    factory.httpErrorHandler = function(localDescription, http, status, fnc, httpObj){
      return function (http, status, fnc, httpObj) {
        console.log('Adding new site failed: ', http, status, httpObj);
        vm.message = 'Adding new site failed. ' + (http.message ? http.message : '');
      }
    };

    return factory;
  }

  app.factory('utilService', [controller]);

})();

