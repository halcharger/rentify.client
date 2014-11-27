'use strict';

console.log('running app-run');
app.run(['authService', function (authService) {
  authService.fillAuthData();
}]);
