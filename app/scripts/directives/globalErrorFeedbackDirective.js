(function () {
  'use strict';

  app.directive('globalErrorFeedback', function () {
    return {
      restrict:'E',
      scope: {
      },
      controller: function($rootScope, $scope){
        $scope.hideMessage = true;
        $scope.message = '';
        $rootScope.$on('globalErrorEvent', function(event, e){
          $scope.message = e;
          $scope.hideMessage = false;
        });
        $rootScope.$on('globalClearErrorEvent', function(){
          $scope.hideMessage = true;
          $scope.message = '';
        });
      },
      template:     '<div data-ng-hide="hideMessage"' +
                    ' class="note note-danger note-bordered clearfix"' +
                    ' ng-bind-html="message">' +
                    '</div>'
    };
  });

}());
