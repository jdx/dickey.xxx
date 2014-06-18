angular.module('xxx', [
  'xxxTemplates'
])

angular.module('xxx')
  .controller('GithubCtrl', function ($scope, githubService) {
    githubService.fetchPublicEventsFor('dickeyxxx').success(function (events) {
      $scope.events = events.splice(0, 15)
    })
  })

angular.module('xxx')
  .factory('githubService', function ($http) {
    return {
      fetchPublicEventsFor: function () {
        return $http.get('/api/github/events')
      }
    }
  })

angular.module('xxx')
  .controller('PostsCtrl', function ($scope, postsService) {
    postsService.fetch().success(function (posts) {
      $scope.posts = posts
    })
  })

angular.module('xxx')
  .factory('postsService', function ($http) {
    return {
      fetch: function () { return $http.get('/api/posts') }
    }
  })
