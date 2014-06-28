angular.module('admin')
.service('PostsSvc', function ($http, authService) {
  var svc = this
  $http.defaults.headers.common.Authorization = 'Bearer ' + authService.jwt
  svc.fetch = function () {
    return $http.get('/admin/api/posts')
  }
  svc.find = function (id) {
    return $http.get('/admin/api/posts/' + id)
  }
  svc.create = function (post) {
    return $http.post('/admin/api/posts', post)
  }
  svc.update = function (post) {
    return $http.put('/admin/api/posts/' + post._id, post)
  }
})
