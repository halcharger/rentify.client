(function () {
  'use strict';

  function controller($http, $q, authService, configuration, DSCacheFactory, sitesService) {

    authService.redirectToLoginIfNotAuthenticated();

    var pagesCacheKey = 'pages';
    var baseUri = configuration.serverBaseUri;
    var factory = {};

    DSCacheFactory(pagesCacheKey, {
      maxAge: 90000, // Items added to this cache expire after 15 minutes.
      cacheFlushInterval: 600000, // This cache will clear itself every hour.
      deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
    });

    factory.getPages = function(){
      var siteUniqueId = sitesService.getSelectedSite().uniqueId;
      var deferred = $q.defer(),
        start = new Date().getTime(),
        pagesCache = DSCacheFactory.get(pagesCacheKey);

      if (pagesCache.get(siteUniqueId)){
        deferred.resolve(pagesCache.get(siteUniqueId));
      } else {
        $http.post(baseUri + 'api/' + siteUniqueId + '/pages')
          .success(function(results){
            console.log('time taken for pages request: ' + (new Date().getTime() - start) + 'ms');
            pagesCache.put(siteUniqueId, results);
            deferred.resolve(results);
          });
      }
      return deferred.promise;
    };

    factory.refreshPages = function(){
      var siteUniqueId = sitesService.getSelectedSite().uniqueId;
      return $http.post(baseUri + 'api/' + siteUniqueId + '/pages')
        .success(function(results){
          var pagesCache = DSCacheFactory.get(pagesCacheKey);
          pagesCache.put(siteUniqueId, results);
          return results;
        });
    };

    factory.savePage = function(page){
      var siteUniqueId = sitesService.getSelectedSite().uniqueId;
      return $http.post(baseUri + 'api/' + siteUniqueId + '/save', page)
        .success(function(savedWebPage){
          addPageToCache(savedWebPage, siteUniqueId);
        });
    };

    factory.deletePage = function(page){
      var siteUniqueId = sitesService.getSelectedSite().uniqueId;
      return $http.delete(baseUri + 'api/' + siteUniqueId + '/delete?webPageId=' + page.id)
        .success(function(){
          deletePageFromCache(page, siteUniqueId);
        });
    };

    function deletePageFromCache(page, siteUniqueId){
      var cache = DSCacheFactory.get(pagesCacheKey);
      var pages = cache.get(siteUniqueId);
      for(var i = pages.length - 1; i >= 0; i--) {
        if(pages[i].id === page.id) {
          pages.splice(i, 1);
        }
      }
      cache.put(pagesCacheKey, pages);
    }
    function addPageToCache(page, siteUniqueId){

      deletePageFromCache(page, siteUniqueId);

      var cache = DSCacheFactory.get(pagesCacheKey);
      var pages = cache.get(siteUniqueId);
      pages.push(page);
      cache.put(siteUniqueId, pages);
    }

    return factory;
  }

  app.factory('pagesService', ['$http', '$q', 'authService', 'configuration', 'DSCacheFactory', 'sitesService', controller]);

})();

