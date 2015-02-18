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
    'ui.bootstrap',
    'flow',
    'angular-images-loaded'
  ]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
});

app.config(['flowFactoryProvider', function(flowFactoryProvider){
  flowFactoryProvider.defaults = {
    permanentErrors: [500, 501],
    maxChunkRetries: 2,
    chunkRetryInterval: 5000
  };
}]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html'
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
    .when('/editsite-theme', {
      templateUrl: 'views/editsitetheme.html',
      controller: 'editSiteThemeController'
    })
    .when('/editsite-pages', {
      templateUrl: 'views/editSitePages.html',
      controller: 'editSitePagesController'
    })
    .when('/property-overview', {
      templateUrl: 'views/editsitepropertydetailsoverview.html',
      controller: 'editSitePropertyDetailsOverviewController'
    })
    .when('/property-location', {
      templateUrl: 'views/editSitePropertyLocation.html',
      controller: 'editSitePropertyLocationController'
    })
    .when('/property-gallery', {
      templateUrl: 'views/editSitePropertyGallery.html',
      controller: 'editSitePropertyGalleryController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

