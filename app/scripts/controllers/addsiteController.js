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
      return sitesService.addSite(vm.site).success(function (results) {
        notificationService.success('New site [' + vm.site.name + '] successully added.');
        $location.path('mysites');
      })
        .error(function (http, status, fnc, httpObj) {
          console.log('Adding new site failed: ', http, status, httpObj);
          vm.message = 'Adding new site failed. ' + (http.message ? http.message : '');
        })
    }

    $scope.vm = vm;

  }

  app.controller('addSiteController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', controller]);

})();
