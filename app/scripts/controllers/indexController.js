(function () {
  'use strict';

  function IndexController($scope, $location, authService, configuration) {

    var vm = {};

    vm.environment = configuration.environment;

    vm.logOut = function () {
      authService.logOut();
      $location.path('/login');
    };

    vm.authentication = authService.authentication;

    $scope.vm = vm;

  }

  app.controller('indexController', ['$scope', '$location', 'authService', 'configuration', IndexController]);

})();
