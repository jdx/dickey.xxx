angular.module('admin')
  .factory('postsService', function ($http, authService) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + authService.jwt
    return {
      fetch: function () {
        return $http.get('/admin/api/posts')
      },
      find: function (id) {
        return $http.get('/admin/api/posts/' + id)
      },
      create: function (post) {
        return $http.post('/admin/api/posts', post)
      },
      update: function (post) {
        return $http.put('/admin/api/posts/' + post._id, post)
      }
    }
  })
