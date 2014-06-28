angular.module('xxx')
.service('PostsSvc', function ($http) {
  var svc = this
  svc.fetch = function ()   { return $http.get('/api/posts') }
  svc.find  = function (id) { return $http.get('/api/posts/' + id) }
})
