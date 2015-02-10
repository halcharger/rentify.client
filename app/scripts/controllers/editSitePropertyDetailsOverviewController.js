(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService, notificationService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.propertyOverview = {};
    vm.site = sitesService.getSelectedSite();

    if (!vm.site || !vm.site.uniqueId){
      $location.path('mysites');
      return;
    }

    vm.loadPropertyOverviewData = function(){
      return sitesService.getPropertyOverview(vm.site.uniqueId)
        .success(function(results){
          vm.propertyOverview = results;
        });
    };

    vm.save = function(){
      vm.propertyOverview.uniqueId = vm.site.uniqueId;
      return sitesService.updatePropertyOverview(vm.propertyOverview)
        .success(function(){
          notificationService.success('Property Overview successfully saved.');
        });
    };

    $scope.vm = vm;

    vm.loadPropertyOverviewData ();

  }

  app.controller('editSitePropertyDetailsOverviewController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', controller]);

})();
