angular.module('admin')
  .controller('PostsCtrl', function ($scope, PostsSvc) {
    var reload = function () {
      PostsSvc.fetch().success(function (posts) {
        $scope.posts = posts
      })
    }

    reload()

    $scope.newPost = {}
    $scope.create = function (post) {
      PostsSvc.create(post).success(function () {
        reload()
        $scope.newPost = {}
      })
    }
  })
