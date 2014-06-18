angular.module('xxx')
  .controller('AdminPostCtrl', function ($scope, $routeParams, postsService) {
    var setPost = function (post) { $scope.post = post }

    postsService.find($routeParams.id).success(setPost)

    $scope.unpublish = function (post) {
      postsService.unpublish(post._id).success(setPost)
    }

    $scope.publish = function (post) {
      postsService.publish(post._id).success(setPost)
    }
  })
