(function () {
  'use strict';

  function MySitesController($scope, authService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};

    $scope.vm = vm;

  }

  app.controller('mysitesController', ['$scope', 'authService', MySitesController]);

})();
