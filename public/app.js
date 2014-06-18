angular.module('xxx', [])

angular.module('xxx')
  .controller('PostsCtrl', function ($scope, postsService) {
    $scope.newPost = {}
    $scope.create = function (post) {
      postsService.create(post).success($scope.reload)
    }

    $scope.reload = function () {
      postsService.fetch().success(function (posts) {
        $scope.posts = posts
      })
    }

    $scope.reload()
  })

angular.module('xxx')
  .factory('postsService', function ($http) {
    return {
      create: function (post) {
        return $http.post('/api/posts.json', post)
      },
      fetch: function () {
        return $http.get('/api/posts.json')
      }
    }
  })
