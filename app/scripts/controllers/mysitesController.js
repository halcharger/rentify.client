(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.sites = [];
    vm.loadingSites = true;

    vm.getSites = function () {
      vm.loadingSites = true;
      sitesService.getMySites()
        .then(function (results) {
          vm.sites = results;
          vm.loadingSites = false;
        },
        function (http, status, fnc, httpObj) {
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
          vm.loadingSites = false;
        });
    };

    vm.deleteSite = function(site){
      sitesService.setSelectedSite(site);
      $location.path('deletesite');
    };

    vm.editSite = function(site){
      sitesService.setSelectedSite(site);
      $location.path('editsite-theme');
    };

    vm.getSites();

    $scope.vm = vm;

  }

  app.controller('mysitesController', ['$scope', '$location', 'authService', 'sitesService', controller]);

})();
