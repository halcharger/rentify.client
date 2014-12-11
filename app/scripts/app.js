'use strict';

var app = angular
  .module('rentify', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'angular-loading-bar',
    'services.config',
    'toastr',
    'angular-data.DSCacheFactory',
    'ui.bootstrap'
  ]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
});

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController'
    })
    .when('/mysites', {
      templateUrl: 'views/mysites.html',
      controller: 'mysitesController'
    })
    .when('/addsite', {
      templateUrl: 'views/addsite.html',
      controller: 'addSiteController'
    })
    .when('/deletesite', {
      templateUrl: 'views/deletesite.html',
      controller: 'deletesiteController'
    })
    .when('/editsite', {
      templateUrl: 'views/editsite.html',
      controller: 'editsiteController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

