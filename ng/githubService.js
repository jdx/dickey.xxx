angular.module('xxx')
  .factory('githubService', function ($http) {
    return {
      fetchPublicEventsFor: function (username) {
        return $http({
          method: 'JSONP',
          url: '//api.github.com/users/' + username + '/events/public?callback=JSON_CALLBACK',
          cache: true
        })
      }
    }
  })
