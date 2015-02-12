(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService, notificationService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.location = {};
    vm.site = sitesService.getSelectedSite();

    if (!vm.site || !vm.site.uniqueId){
      $location.path('mysites');
      return;
    }

    vm.loadData = function(){
      return sitesService.getLocation(vm.site.uniqueId)
        .success(function(results){
          vm.location = results;
        });
    };

    vm.save = function(){
      vm.location.uniqueId = vm.site.uniqueId;
      return sitesService.updateLocation(vm.location)
        .success(function(){
          notificationService.success('Property Location successfully saved.');
        });
    };

    vm.mapImageUploadSuccess = function(msg){
      console.log('map image upload success: ' + msg);
    };


    $scope.vm = vm;

    vm.loadData ();

  }

  app.controller('editSitePropertyLocationController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', controller]);

})();
