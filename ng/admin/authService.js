angular.module('admin')
  .factory('authService', function ($http, $location, $window) {
    if ($location.search().jwt) {
      $window.localStorage.jwt = $location.search().jwt
      $location.search('jwt', null)
    }
    var jwt = $window.localStorage.jwt
    var isLoggedIn = !!jwt
    var redirectToLogin = function () {
      $window.location.href = '/admin/github/auth'
    }
    var authheader = 'Bearer ' + jwt
    $http.defaults.headers.common.Authorization = authheader
    return {
      isLoggedIn: isLoggedIn,
      jwt: jwt,
      authheader: authheader,
      ensureAuthorized: isLoggedIn ? _.noop : redirectToLogin,
      getCurrentUser: function () {
        return $http.get('/admin/api/user')
      }
    }
  })
