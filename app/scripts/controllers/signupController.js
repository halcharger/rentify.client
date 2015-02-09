'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', 'notificationService',
  function ($scope, $location, $timeout, authService, notificationService) {

    var vm = {};
    vm.savedSuccessfully = false;
    vm.message = '';

    vm.registration = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    vm.signUp = function () {

      vm.registration.userName = vm.registration.email;

      return authService.saveRegistration(vm.registration).then(function () {

          vm.savedSuccessfully = true;
          notificationService.success('User has been registered successfully, you will be redirected to login page in 2 seconds.');
          startTimer();

        });
    };

    var startTimer = function () {
      var timer = $timeout(function () {
        $timeout.cancel(timer);
        $location.path('/login');
      }, 2000);
    };

    $scope.vm = vm;

  }]);
