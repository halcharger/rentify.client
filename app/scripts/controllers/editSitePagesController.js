(function () {
  'use strict';

  function controller($scope, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.site = sitesService.getSelectedSite();

    $scope.vm = vm;

  }

  app.controller('editSitePagesController', ['$scope', 'authService', 'sitesService', controller]);

})();
