(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.site = sitesService.getSelectedSite();

    $scope.vm = vm;

  }

  app.controller('editsiteController', ['$scope', '$location', 'authService', 'sitesService', controller]);

})();
