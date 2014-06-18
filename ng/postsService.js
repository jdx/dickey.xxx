angular.module('xxx')
  .factory('postsService', function ($http) {
    return {
      create: function (post) {
        return $http.post('/api/posts', post)
      },
      fetch: function () {
        return $http.get('/api/posts')
      },
      find: function (id) {
        return $http.get('/api/posts/' + id)
      },
      unpublish: function (id) {
        return $http.post('/api/posts/' + id + '/unpublish')
      },
      publish: function (id) {
        return $http.post('/api/posts/' + id + '/publish')
      }
    }
  })
