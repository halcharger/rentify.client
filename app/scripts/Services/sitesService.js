(function () {
  'use strict';

  function controller($http, authService, configuration) {

    authService.redirectToLoginIfNotAuthenticated();

    var baseUri = configuration.serverBaseUri;
    var siteSelectedForDeletion;

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
      return $http.delete(baseUri + 'api/mysites/delete?uniqueId=' + siteUniqueId);
    }

    function setSiteSelectedForDeletion(site){
      siteSelectedForDeletion = site;
    };

    function getSiteSelectedForDeletion(){
      return siteSelectedForDeletion;
    };

    var factory = {};
    factory.getMySites = getMySites;
    factory.addSite = addSite;
    factory.deleteSite = deleteSite;
    factory.setSiteSelectedForDeletion = setSiteSelectedForDeletion;
    factory.getSiteSelectedForDeletion = getSiteSelectedForDeletion;
    return factory;

  }

  app.factory('sitesService', ['$http', 'authService', 'configuration', controller]);

})();

