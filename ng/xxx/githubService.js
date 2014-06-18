angular.module('xxx')
  .factory('githubService', function ($http) {
    return {
      fetchPublicEventsFor: function () {
        return $http.get('/api/github/events')
      }
    }
  })
