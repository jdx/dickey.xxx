angular.module('admin')
  .controller('EditPostCtrl', function ($scope, $timeout, $routeParams, postsService) {
    var setPost = function (post) { $scope.post = post }

    postsService.find($routeParams.id).success(setPost)

    $scope.unpublish = function (post) {
      postsService.unpublish(post._id).success(setPost)
    }

    $scope.publish = function (post) {
      postsService.publish(post._id).success(setPost)
    }

    $scope.save = function (post) {
      postsService.update(post).success(function () {
        $scope.post = post
        $scope.saved = true
        $timeout(function () { $scope.saved = false }, 5000)
      })
    }
  })
