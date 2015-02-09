(function () {
  'use strict';

  function controller($scope, authService, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var vm = {};
    vm.themes = ['lavilla'];
    vm.site = sitesService.getSelectedSite();

    vm.save = function(){
      sitesService.updateTheme(vm.site.uniqueId, vm.selectedTheme)
        .success(function(results){

        })
        .error()
    }

    $scope.vm = vm;

  }

  app.controller('editSiteThemeController', ['$scope', 'authService', 'sitesService', controller]);

})();
