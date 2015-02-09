(function () {
  'use strict';

  app.directive('defaultPanel', function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        panelHeading: '@'
      },
      template:   '<div class="panel panel-default">' +
                  '<div class="panel-heading">' +
                  '<h4 class="panel-title">{{panelHeading}}</h4></div>' +
                  '<div class="panel-collapse collapse in" aria-expanded="true">' +
                  '<div class="panel-body">' +
                  '<ng-transclude></ng-transclude>' +
                  '</div></div></div>'

    };
  });

}());
