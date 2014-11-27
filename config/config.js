'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    serverBaseUri: '@@serverBaseUri',
    clientId: "rentifyAngularMainApp",
    environment: '@@environment'
  });
