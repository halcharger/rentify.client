(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService, notificationService, localStorageService) {

    authService.redirectToLoginIfNotAuthenticated();

    /*
    $scope.imgLoadedEvents = {

      done: function(instance) {
        console.log('img loading done: ', instance);
        angular.element(instance.elements[0]).removeClass('is-loading');
      },

      fail: function(instance) {
        // Do stuff
        console.log('img loading fail: ', instance);
        angular.element(instance.elements[0]).addClass('is-broken');
      }

    };
    */

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
          vm.location.customMapImageUrl = vm.location.customMapImageUrl + '?now=' + new Date().getTime()
        });
    };

    vm.save = function(){
      vm.location.uniqueId = vm.site.uniqueId;
      return sitesService.updateLocation(vm.location)
        .success(function(){
          notificationService.success('Property Location successfully saved.');
        });
    };

    vm.getSecurityHeaders = function(){
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        return {Authorization:'Bearer ' + authData.token}
      }
    };

    vm.getFlowJsUploadTarget = function(){
      return sitesService.getCustomMapImageUploadUrl(vm.site.uniqueId);
    };

    vm.onFileUploadSuccess = function(file){
      console.log('file upload success...');
      file.cancel();
    };


    $scope.vm = vm;

    vm.loadData ();

  }

  app.controller('editSitePropertyLocationController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', 'localStorageService', controller]);

})();
