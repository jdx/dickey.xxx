angular.module('xxx')
  .factory('postsService', function ($http, authService) {
    return {
      fetch: function () {
        return $http.get('/api/posts')
      },
      find: function (id) {
        return $http.get('/api/posts/' + id)
      },
      create: function (post) {
        return $http.post('/api/posts', post, {
          headers: { 'Authorization': 'Bearer ' + authService.jwt }
        })
      },
      unpublish: function (id) {
        return $http.post('/api/posts/' + id + '/unpublish', {}, {
          headers: { 'Authorization': 'Bearer ' + authService.jwt }
        })
      },
      publish: function (id) {
        return $http.post('/api/posts/' + id + '/publish', {}, {
          headers: { 'Authorization': 'Bearer ' + authService.jwt }
        })
      }
    }
  })
