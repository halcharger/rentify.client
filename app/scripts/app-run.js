'use strict';

app.run(['authService', function (authService) {
  authService.fillAuthData();
}]);
