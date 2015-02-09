(function () {
  'use strict';

  app.directive('configureSiteTabs', function () {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      activeTab: '@'
    },
    controller: function($scope){
      $scope.theThemeTabClass = ($scope.activeTab == 'ThemeAndStyling') ? 'active' : '';
      $scope.thePropertyTabClass = ($scope.activeTab == 'PropertyDetails') ? 'active' : '';
      $scope.thePagesTabClass = ($scope.activeTab == 'Paging') ? 'active' : '';
    },
    template: '<div class="tabbable tabbable-custom tabbable-noborder">' +
              '<ul class="nav nav-tabs">' +
              '<li ng-class="theThemeTabClass"><a href="#/configuresitetheme" data-toggle="tab" aria-expanded="false">Theme and Styling</a></li>' +
              '<li ng-class="thePropertyTabClass"><a href="#/configuresiteproperties" data-toggle="tab" aria-expanded="false">Properties</a></li>' +
              '<li ng-class="thePagesTabClass"><a href="#/configuresitepages" data-toggle="tab" aria-expanded="true">Pages</a></li>' +
              '</ul>' +
              '<div class="tab-content">' +
              '<div class="tab-pane active">' +
              '<ng-transclude></ng-transclude>' +
              '</div></div></div>'
  };
});

}());
