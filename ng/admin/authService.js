angular.module('xxx')
  .factory('authService', function ($location, $window) {
    if ($location.search().jwt) {
      $window.localStorage.jwt = $location.search().jwt;
    }
    return {
      loggedIn: !!$window.localStorage.jwt,
      jwt: $window.localStorage.jwt
    }
  })
