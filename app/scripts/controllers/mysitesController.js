(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.sites = [];
    vm.message = '';
    vm.loadingSites = true;

    vm.getSites = function () {
      vm.loadingSites = true;
      sitesService.getMySites()
        .then(function (results) {
          vm.sites = results;
          vm.loadingSites = false;
        },
        function (http, status, fnc, httpObj) {
          console.log('Getting MySites failed: ', http, status, httpObj);
          vm.message = 'Getting My Sites failed. ' + (http.message ? http.message : '');
          vm.loadingSites = false;
        });
    };

    vm.refreshSites = function(){
      vm.loadingSites = true;
      return sitesService.refreshMySites()
        .success(function(results){
          vm.sites = results;
          vm.loadingSites = false;
        })
        .error(function(){
          vm.message = 'Refreshing My Sites failed.';
          vm.loadingSites = false;
        });
    };

    vm.deleteSite = function(site){
      sitesService.setSelectedSite(site);
      $location.path('deletesite');
    };

    vm.editSite = function(site){
      sitesService.setSelectedSite(site);
      $location.path('editsite');
    };

    vm.getSites();

    $scope.vm = vm;

  }

  app.controller('mysitesController', ['$scope', '$location', 'authService', 'sitesService', controller]);

})();
