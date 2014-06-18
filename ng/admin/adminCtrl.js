angular.module('xxx')
  .controller('AdminCtrl', function ($scope, postsService) {
    var reload = function () {
      postsService.fetch().success(function (posts) {
        $scope.posts = posts
      })
    }

    reload()

    $scope.newPost = {}
    $scope.create = function (post) {
      postsService.create(post).success(function () {
        reload()
        $scope.newPost = {}
      })
    }
  })
