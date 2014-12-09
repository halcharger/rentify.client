(function () {
  'use strict';

  function controller($http, $q, authService, configuration, DSCacheFactory) {

    authService.redirectToLoginIfNotAuthenticated();

    var sitesCacheKey = 'mysites';
    var baseUri = configuration.serverBaseUri;
    var siteSelectedForDeletion;

    DSCacheFactory(sitesCacheKey, {
      maxAge: 90000, // Items added to this cache expire after 15 minutes.
      cacheFlushInterval: 600000, // This cache will clear itself every hour.
      deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });

    function getMySites(){
      var deferred = $q.defer(),
        start = new Date().getTime(),
        mySitesCache = DSCacheFactory.get(sitesCacheKey);

      if (mySitesCache.get(sitesCacheKey)){
        deferred.resolve(mySitesCache.get(sitesCacheKey));
      } else {
        $http.post(baseUri + 'api/mysites')
          .success(function(results){
            console.log('time taken for mysites request: ' + (new Date().getTime() - start) + 'ms');
            mySitesCache.put(sitesCacheKey, results);
            deferred.resolve(results);
          });
      }
      return deferred.promise;
    }

    function refreshMySites(){
      return $http.post(baseUri + 'api/mysites')
        .success(function(results){
          var mySitesCache = DSCacheFactory.get(sitesCacheKey);
          mySitesCache.put(sitesCacheKey, results);
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
    factory.refreshMySites = refreshMySites;
    return factory;

  }

  app.factory('sitesService', ['$http', '$q', 'authService', 'configuration', 'DSCacheFactory', controller]);

})();

