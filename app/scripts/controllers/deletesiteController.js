(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService, notificationService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.message = '';
    vm.site = sitesService.getSelectedSite();

    if (!vm.site){
      $location.path('mysites');
    }

    vm.cancel = function(){
      sitesService.clearSelectedSite();
      $location.path('mysites');
    };

    vm.deleteSite = function(){
      return sitesService.deleteSite(vm.site.uniqueId)
        .success(function(){
          //TODO: notify user that delete was successful
          notificationService.success('The site: ' + vm.site.name + ' was successully deleted.')
          vm.cancel();
        })
        .error(function (http, status, fnc, httpObj) {
          console.log('Error encountered deleting site:', http, status, httpObj);
          vm.message = http.error_description;
        });
    };

    $scope.vm = vm;

  }

  app.controller('deletesiteController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', controller]);

})();

