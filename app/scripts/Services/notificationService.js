(function() {
  'use strict';

  angular
    .module('rentify')
    .factory('notificationService',['toastr', Notifications]);

  function Notifications(toastr) {

    var toastrOptions = {
      positionClass: "toast-bottom-right"
    };

    function currTime() {
      return new Date().toUTCString();
    }

    var factory = {};

    factory.info = function(message) {
      toastr.info(message, currTime(), toastrOptions);
    }

    factory.error = function(message) {
      toastr.error(message, currTime(), toastrOptions);
    }

    factory.success = function(message) {
      toastr.success(message, currTime(), toastrOptions);
    }

    factory.warning = function(message) {
      toastr.warning(message, currTime(), toastrOptions);
    }

    return factory;
  }
})();


