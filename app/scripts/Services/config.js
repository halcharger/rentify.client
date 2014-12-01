'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    serverBaseUri: 'http://localhost:63187/',
    clientId: "rentifyAngularMainApp",
    environment: 'LOCAL'
  });
