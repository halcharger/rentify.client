'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    serverBaseUri: 'http://rentifydev01.azurewebsites.net/',
    clientId: "rentifyAngularMainApp",
    environment: 'DEV'
  });
