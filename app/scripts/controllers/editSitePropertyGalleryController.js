(function () {
  'use strict';

  function controller($scope, $location, authService, sitesService, notificationService, localStorageService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.gallery = {};
    vm.site = sitesService.getSelectedSite();

    if (!vm.site || !vm.site.uniqueId){
      $location.path('mysites');
      return;
    }

    vm.loadData = function(){
      return sitesService.getGallery(vm.site.uniqueId)
        .success(function(results){
          vm.gallery = results;
        });
    };

    vm.save = function(){
      vm.gallery.uniqueId = vm.site.uniqueId;
      return sitesService.updateGallery(vm.gallery)
        .success(function(){
          notificationService.success('Gallery successfully saved.');
        });
    };

    vm.getSecurityHeaders = function(){
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        return {Authorization:'Bearer ' + authData.token}
      }
    };

    vm.startUpload = function(flow){
      flow.target = sitesService.getGalleryImageUploadUrl(vm.site.uniqueId, vm.gallery.id);
      console.log('flow.target: ' + flow.target);
      flow.upload();
    };

    vm.removeGalleryImage = function(siteUniqueId, galleryId, imgurl){
      console.log('imgurl: ' + imgurl);
      sitesService.removeGalleryImage(siteUniqueId, galleryId, imgurl)
        .success(function(){
          console.log('reloading gallery after successfully removing image');
          vm.loadData();
      });
    };

    vm.getFlowJsUploadTarget = function(){
      return sitesService.getGalleryImageUploadUrl(vm.site.uniqueId, vm.gallery.id);
    };

    vm.onFileUploadSuccess = function(file){
      console.log('file upload success...', file);
      file.cancel();
    };

    vm.onFlowError = function(file, message){
      console.log('onFlowError: ', file, message);
    };

    vm.onFlowComplete = function(){
      notificationService.info('File uploads complete.');
    }


    $scope.vm = vm;

    vm.loadData ();

  }

  app.controller('editSitePropertyGalleryController', ['$scope', '$location', 'authService', 'sitesService', 'notificationService', 'localStorageService', controller]);

})();
