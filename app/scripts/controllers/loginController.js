app.controller('loginController', ['$scope', '$location', 'configuration', 'authService',
  function ($scope, $location, configuration, authService) {

    var vm = {};

    var serviceBase = configuration.serverBaseUri;
    var clientId = configuration.clientId;

    vm.loginData = {
      userName: '',
      password: '',
      useRefreshTokens: false
    };

    vm.message = '';

    vm.login = function () {

      console.log('entering login function');
      vm.message = '';

      return authService.login(vm.loginData)
        .success(function () {
          $location.path('/mysites');
        });
      /*
        .error(function (http, status, fnc, httpObj) {
          console.log('Error encountered logging in:', http, status, httpObj);
          if (http)
            vm.message = http.error_description;
          else
            vm.message = 'Failed to connect to the server, please try again.';
        });
        */
    };

    vm.authExternalProvider = function (provider) {

      var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

      var externalProviderUrl = serviceBase + "api/Account/ExternalLogin?provider=" + provider
        + "&response_type=token&client_id=" + clientId
        + "&redirect_uri=" + redirectUri;
      window.$windowScope = $scope;

      var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

      $scope.$apply(function () {

        if (fragment.haslocalaccount == 'False') {

          console.log('external account is not linked to a local account, linking...');

          authService.logOut();

          authService.externalAuthData = {
            provider: fragment.provider,
            userName: fragment.external_user_name,
            email: fragment.external_email,
            externalAccessToken: fragment.external_access_token
          };

          $scope.registerData = {
            userName: authService.externalAuthData.email,
            email: authService.externalAuthData.email,
            provider: authService.externalAuthData.provider,
            externalAccessToken: authService.externalAuthData.externalAccessToken
          };

          console.log('about to post registerData: ', $scope.registerData)

          authService.registerExternal($scope.registerData)
            .success(function () {
              $location.path('/orders');
            })
            .error(function (http, status, fnc, httpObj) {
              console.log('Error encountered associating external login with local app account:', http, status, httpObj);
              vm.message = http.error_description;
            });

        }
        else {
          console.log('external account is linked to a local account, logging in...');
          //Obtain access token and redirect to orders
          var externalData = {provider: fragment.provider, externalAccessToken: fragment.external_access_token};
          authService.obtainAccessToken(externalData).then(function (response) {

              $location.path('/orders');

            },
            function (http, status, fnc, httpObj) {
              console.log('Error encountered logging in (authCompletedCB): ', http, status, httpObj);
              vm.message = http.error_description;
            });
        }

      });
    };

    $scope.vm = vm;

  }]);
