angular.module('xxx')
  .factory('twitterService', function ($http) {
    return {
      fetch: function () {
        return $http.get('/api/tweets')
      }
    }
  })
