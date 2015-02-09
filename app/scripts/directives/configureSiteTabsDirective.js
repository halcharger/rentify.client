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
      $scope.thePagesTabClass = ($scope.activeTab == 'Pages') ? 'active' : '';
      $scope.theSettingsTabClass = ($scope.activeTab == 'Settings') ? 'active' : '';
    },
    template: '<div class="tabbable tabbable-custom tabbable-noborder">' +
              '<ul class="nav nav-tabs">' +
              '<li ng-class="theThemeTabClass"><a href="#/editsite-theme" data-toggle="tab" aria-expanded="false">Theme and Styling</a></li>' +
              '<li ng-class="thePropertyTabClass"><a href="#/editsite-propertydetails-overview" data-toggle="tab" aria-expanded="false">Property Details</a></li>' +
              '<li ng-class="thePagesTabClass"><a href="#/editsite-pages" data-toggle="tab" aria-expanded="true">Pages</a></li>' +
              '<li ng-class="theSettingsTabClass"><a href="#/editsite-settings" data-toggle="tab" aria-expanded="true">Settings</a></li>' +
              '</ul>' +
              '<div class="tab-content">' +
              '<div class="tab-pane active">' +
              '<ng-transclude></ng-transclude>' +
              '</div></div></div>'
  };
});

}());
