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
