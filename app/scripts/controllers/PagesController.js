(function () {
  'use strict';

  function controller($scope, $location, $modal, authService, sitesService, pagesService, notificationService) {

    authService.redirectToLoginIfNotAuthenticated();

    if (!sitesService.getSelectedSite()){
      $location.path('mysites');
      return;
    }

    var vm = {};
    vm.message ='';
    vm.configurePage = false;
    vm.pages = [];
    vm.page;

    console.log('pages: ', vm.pages);

    vm.addPage = function(){
      var newPage = {menuText:'', title:'', content:''};
      vm.page = newPage;
      vm.configurePage = true;
    };

    vm.editPage = function(page){
      vm.page = page;
      vm.configurePage = true;
    };

    vm.deletePage = function(page){
      vm.page = page;
      var modalInstance = $modal.open({
        templateUrl: 'deletePageModalContent.html',
        controller: 'SimpleDeleteModalInstanceController',
        resolve: {
          objToDelete: function () {
            return vm.page;
          }
        }
      });

      modalInstance.result.then(function () {
        pagesService.deletePage(vm.page)
          .success(function(){
            notificationService.success('Successfully deleted page titled: ' + vm.page.title);
          });
      }, function () {

      });
    };

    vm.savePage = function(){
      return pagesService.savePage(vm.page)
        .success(function(){
          switchBackToPagesView();
        })
        .error(function (http, status, fnc, httpObj) {
          console.log('Error encountered saving page: ', http, status, httpObj);
          var msg = '';
          if (http.error_description){
            msg = 'Error Description: ' + http.error_description;
          }
          if (http.message){
            msg = ((msg) ? msg + ', Message: ' : 'Message: ') + http.message;
          }
          if (http.messageDetail){
            msg = msg + ', Message Detail: ' + http.messageDetail;
          }
          if (http.exceptionMessage){
            msg = msg + ', Exception Message: ' + http.exceptionMessage;
          }
          if (!msg){
            msg = 'Error encountered trying to save the page details.';
          }
          vm.message = msg;
        });
    };

    vm.cancel = function(){
      console.log('switching back');
      switchBackToPagesView();
    };

    vm.getPages = function(){
      pagesService.getPages(sitesService.getSelectedSite().uniqueId)
        .then(function(results){
          vm.pages = results;
        }, function(){
          console.log('Error encountered getting pages.');
        });

    };

    function switchBackToPagesView(){
      vm.page = {};
      vm.configurePage = false;
    }

    vm.getPages();

    $scope.vm = vm;

  }

  app.controller('PagesController', ['$scope', '$location', '$modal', 'authService', 'sitesService', 'pagesService', 'notificationService', controller]);

})();
