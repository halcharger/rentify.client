(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService, notificationService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.message = '';
    vm.site = {
      name: '',
      uniqueId: ''
    };

    vm.addSite = function () {
      return sitesService.addSite(vm.site)
        .success(function (results) {
          notificationService.success('New site [' + vm.site.name + '] successully added.');
          sitesService.setSelectedSite(vm.site);
          $location.path('editsite-theme');
        });
    }

    $scope.vm = vm;

  }

  app.controller('addSiteController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', controller]);

})();
