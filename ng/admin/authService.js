angular.module('admin')
  .factory('authService', function ($http, $location, $window) {
    if ($location.search().jwt) {
      $window.localStorage.dickeyxxx_token = $location.search().jwt
      $location.search('jwt', null)
    }
    var jwt = $window.localStorage.dickeyxxx_token
    var authheader = 'Bearer ' + jwt
    $http.defaults.headers.common.Authorization = authheader
    return {
      jwt: jwt,
      authheader: authheader,
      redirectToLogin: function () {
        $window.location.href = '/admin/github/auth'
      },
      getCurrentUser: function () {
        return $http.get('/admin/api/user')
      }
    }
  })
