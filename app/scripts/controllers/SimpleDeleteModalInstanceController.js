(function () {
  'use strict';

  function controller($scope, $modalInstance, objToDelete) {
    var vm = {}

    vm.objToDelete = objToDelete;

    vm.ok = function(){
      $modalInstance.close();
    };

    vm.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

    $scope.vm = vm;
  }

  app.controller('SimpleDeleteModalInstanceController', ['$scope', '$modalInstance', 'objToDelete', controller]);

})();

