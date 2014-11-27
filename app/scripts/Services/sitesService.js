(function () {
  'use strict';

  function controller($http, authService, serverApiSettings) {

    authService.redirectToLoginIfNotAuthenticated();

    var baseUri = serverApiSettings.serverBaseUri;

    function getMySites(){
      return $http.post(baseUri + 'api/mysites').success(function(results){
        console.log('Returning results from mysitesService: ', results)
        return results;
      });
    }

    function addSite(site){
      return $http.post(baseUri + 'api/mysites/add', site);
    }

    function deleteSite(siteUniqueId){
      return $http.delete(baseUri + 'api/mysites/delete', {uniqueId: siteUniqueId});
    }

    var factory = {};
    factory.getMySites = getMySites;
    factory.addSite = addSite;
    factory.deleteSite = deleteSite;
    return factory;

  }

  app.factory('sitesService', ['$http', 'authService', 'serverApiSettings', controller]);

})();

