'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService',
  function ($scope, $location, $timeout, authService) {

    var vm = {};
    vm.savedSuccessfully = false;
    vm.message = '';

    vm.registration = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    vm.signUp = function () {

      return authService.saveRegistration(vm.registration).then(function () {

          vm.savedSuccessfully = true;
          vm.message = 'User has been registered successfully, you will be redirected to login page in 2 seconds.';
          startTimer();

        },
        function (response) {
          var errors = [];
          for (var key in response.data.modelState) {
            for (var i = 0; i < response.data.modelState[key].length; i++) {
              errors.push(response.data.modelState[key][i]);
            }
          }
          vm.message = 'Failed to register user due to:' + errors.join(' ');
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
