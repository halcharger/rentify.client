(function () {
  'use strict';

  app.directive('spinnerButton', function () {
    return {
      restrict:'E',
      scope: {
        buttonclass:'@',
        text:'@',
        spinnertext:'@',
        isdisabled:'=',
        click:'&'
      },
      controller: function($scope){
        $scope.isClicked = false;
        $scope.buttonClick = function(){
          $scope.isClicked = true;
          $scope.click().finally(function(){
            $scope.isClicked = false;
          });
        }
      },
      template: '<button class="btn {{buttonclass}} " data-ng-show="isdisabled && !isClicked" data-ng-disabled="true" >' +
      '{{text}}' +
      '</button>' +
      '<button class="btn {{buttonclass}} " data-ng-click="buttonClick()" data-ng-hide="(isdisabled && !isClicked) || isClicked" >' +
      '{{text}}' +
      '</button>' +
      '<button class="btn {{buttonclass}} " data-ng-show="isClicked" data-ng-disabled="true" >' +
      '<i class="fa fa-circle-o-notch fa-spin"></i> {{spinnertext}}' +
      '</button>'

    };
  });

}());
