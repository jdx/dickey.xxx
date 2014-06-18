angular.module('xxx')
  .factory('postsService', function ($http) {
    return {
      create: function (post) {
        return $http.post('/api/posts.json', post)
      },
      fetch: function () {
        return $http.get('/api/posts.json')
      }
    }
  })
