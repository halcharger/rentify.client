(function () {
  'use strict';

  app.directive('spinnerButton', function () {
    return {
      restrict:'E',
      scope: {
        buttonclass:'@',
        text:'@',
        spinnertext:'@',
        disabled:'=',
        click:'&'
      },
      controller: function($scope){
        $scope.buttonText = $scope.text;
        $scope.isClicked = false;
        $scope.buttonClick = function(){
          $scope.buttonText = $scope.spinnertext;
          $scope.isClicked = true;
          $scope.click().then(function(){}, function(){
            //on error
            $scope.buttonText = $scope.text;
            $scope.isClicked = false;
          });
        }
      },
      template: '<button class="btn {{buttonclass}} " data-ng-click="buttonClick()" data-ng-disabled="disabled || isClicked" >' +
      '<i class="fa fa-circle-o-notch fa-spin" data-ng-show="isClicked"></i> {{buttonText}}' +
      '</button>'
    };
  });

}());
