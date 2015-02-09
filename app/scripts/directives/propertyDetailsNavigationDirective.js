(function () {
  'use strict';

  app.directive('propertyDetailsNavigation', function () {
  return {
    restrict: 'E',
    scope: {
      activeTab: '@',
      propertyName: '@'
    },
    controller: function($scope){
      $scope.theOverviewTabClass = ($scope.activeTab == 'Overview') ? 'active' : '';
      $scope.theLocationTabClass = ($scope.activeTab == 'Location') ? 'active' : '';
      $scope.theGalleryTabClass = ($scope.activeTab == 'Gallery') ? 'active' : '';
      $scope.theRatesTabClass = ($scope.activeTab == 'Rates') ? 'active' : '';
      $scope.theContactTabClass = ($scope.activeTab == 'Contact') ? 'active' : '';
      $scope.theReviewsTabClass = ($scope.activeTab == 'Reviews') ? 'active' : '';
    },
    template: '<div class="navbar navbar-default" role="navigation">' +
              '<div class="navbar-header">' +
              '<span class="navbar-brand">Configure Property: {{propertyName}} </span></div>' +
              '<div class="collapse navbar-collapse navbar-ex1-collapse">' +
              '<ul class="nav navbar-nav">' +
              '<li ng-class="theOverviewTabClass"><a href="#/property-overview">Overview</a></li>' +
              '<li ng-class="theLocationTabClass"><a href="#/property-location">Location</a></li>' +
              '<li ng-class="theGalleryTabClass"><a href="#/property-gallery">Gallery</a></li>' +
              '<li ng-class="theRatesTabClass"><a href="#/property-rates">Rates</a></li>' +
              '<li ng-class="theContactTabClass"><a href="#/property-contacts">Contact</a></li>' +
              '<li ng-class="theReviewsTabClass"><a href="#/property-reviews">Reviews</a></li>' +
              '</ul></div></div>'
  };
});

}());
