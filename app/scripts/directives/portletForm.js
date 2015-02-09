(function () {
  'use strict';

  app.directive('portletForm', function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        portletHeading: '@',
        colour: '@',
        faIcon: '@'
      },
      template:   '<div class="portlet box {{colour}}">' +
                  '<div class="portlet-title">' +
                  '<div class="caption">' +
                  '<i class="fa {{faIcon}}"></i> {{portletHeading}}' +
                  '</div></div>' +
                  '<div class="portlet-body form">' +
                  '<ng-transclude></ng-transclude>' +
                  '</div></div>'

    };
  });

}());
