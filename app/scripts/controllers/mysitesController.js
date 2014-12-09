(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.sites = [];
    vm.message = '';

    vm.getSites = function () {
      sitesService.getMySites()
        .then(function (results) {
          vm.sites = results;
        },
        function (http, status, fnc, httpObj) {
          console.log('Getting MySites failed: ', http, status, httpObj);
          vm.message = 'Getting My Sites failed. ' + (http.message ? http.message : '');
        });
    };

    vm.refreshSites = function(){
      return sitesService.refreshMySites()
        .success(function(results){
          vm.sites = results;
        });
    };

    function deleteSite(site){
      console.log(site);
      sitesService.setSiteSelectedForDeletion(site);
      $location.path('deletesite');
    };

    vm.deleteSite = deleteSite;

    vm.getSites();

    $scope.vm = vm;

  }

  app.controller('mysitesController', ['$scope', '$location', 'authService', 'sitesService', controller]);

})();
