'use strict';
app.factory('authInterceptorService', ['$rootScope', '$q', '$location', '$injector', 'localStorageService',
  function ($rootScope, $q, $location, $injector, localStorageService) {

    var authInterceptorServiceFactory = {};
    var $http;

    function broadcastFriendlyErrorMessage(rejection){
      console.log('global generic error handler: rejection:', rejection);
      var msg = 'We are sorry but you experienced an unexpected error. We have done all we can to notify the right people so all you can do right now is try again.';

      //the case where the client cannot connect to the server
      if (!rejection.data && rejection.status == 0 && rejection.statusText === ''){
        msg = 'Unable to connect to the server, please try again in a couple of seconds.';
      }
      else if(rejection.status == 400){
        //the case where we push a custom error description down the wire
        if (rejection.data && rejection.data.error_description){
          msg = rejection.data.error_description;
        }
        //the case where asp.net modelstate errors come down the wire
        else if (rejection.data && rejection.data.message == 'The request is invalid.' && rejection.data.modelState){
          var errors = [];
          for (var key in rejection.data.modelState) {
            for (var i = 0; i < rejection.data.modelState[key].length; i++) {
              errors.push(rejection.data.modelState[key][i]);
            }
          }
          msg = '<strong>Failed to register user due to:</strong><BR/>' + errors.join('<br/>');
        }
        else if (rejection.data && rejection.data.message){
          msg = rejection.data.message;
        }
      }

      $rootScope.$broadcast('globalErrorEvent', msg);
    }

    var _request = function (config) {
      config = config || {};
      config.headers = config.headers || {};

      var authData = localStorageService.get('authorizationData');
      if (authData) {
        config.headers.Authorization = 'Bearer ' + authData.token;
      }

      $rootScope.$broadcast('globalClearErrorEvent');

      return config;
    };

    var _responseError = function (rejection) {
      var deferred = $q.defer();
      if (rejection.status === 401) {
        var authService = $injector.get('authService');
        authService.refreshToken().then(function () {
          _retryHttpRequest(rejection.config, deferred);
        }, function (httpData) {
          console.log('failed to refresh token: ', httpData);
          authService.logOut();
          $location.path('/login');
          deferred.reject(rejection);
        });
      }
      else {
        //generic error handling logic goes here
        broadcastFriendlyErrorMessage(rejection);
        deferred.reject(rejection);
      }
      return deferred.promise;
    };

    var _retryHttpRequest = function (config, deferred) {
      $http = $http || $injector.get('$http');
      $http(config).then(function (response) {
        deferred.resolve(response);
      }, function (response) {
        deferred.reject(response);
      });
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
  }]);
