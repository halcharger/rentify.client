(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.message = '';
    vm.site = sitesService.getSiteSelectedForDeletion();

    if (!vm.site){
      $location.path('mysites');
    }

    vm.cancel = function(){
      sitesService.setSiteSelectedForDeletion({});
      $location.path('mysites');
    };

    vm.deleteSite = function(){
      sitesService.deleteSite(vm.site.uniqueId)
        .success(function(){
          //TODO: notify user that delete was successful
          vm.cancel();
        })
        .error(function (http, status, fnc, httpObj) {
          console.log('Error encountered deleting site:', http, status, httpObj);
          vm.message = http.error_description;
        });
    };

    $scope.vm = vm;

  }

  app.controller('deletesiteController', ['$scope', '$location', 'authService', 'sitesService', controller]);

})();

