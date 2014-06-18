angular.module('xxx')
  .controller('AdminCtrl', function ($scope, postsService, $window, authService) {
    if (!authService.loggedIn) {
      $window.location.href = '/github/auth'
    }
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
