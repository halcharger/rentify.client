(function () {
  'use strict';

  app.directive('pageContentContainer', function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        pageHeading: '@'
      },
      template: '<div class="page-container"><div class="page-head"><div class="container"><div class="page-title">' +
                '<h1>{{pageHeading}}</h1>' +
                '</div></div></div>' +
                '<div class="page-content"><div class="container">' +
                '<ng-transclude></ng-transclude>' +
                '</div></div></div>'
    };
  });

}());
