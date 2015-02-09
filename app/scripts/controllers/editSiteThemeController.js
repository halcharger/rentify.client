(function () {
  'use strict';

  function controller($scope, authService, sitesService, notificationService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.themes = ['lavilla'];
    vm.site = sitesService.getSelectedSite();
    vm.selectedTheme = vm.site.themeId;

    vm.save = function(){
      return sitesService.updateTheme(vm.site.uniqueId, vm.selectedTheme)
        .success(function(results){
          notificationService.success('Successfully updated site theme for ' + vm.site.name + '.');
        });
    }

    $scope.vm = vm;

  }

  app.controller('editSiteThemeController', ['$scope', 'authService', 'sitesService', 'notificationService', controller]);

})();
