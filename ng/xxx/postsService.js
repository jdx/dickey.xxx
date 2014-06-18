angular.module('xxx')
  .factory('postsService', function ($http) {
    return {
      fetch: function () { return $http.get('/api/posts') }
    }
  })
