angular.module('admin')
  .controller('EditPostCtrl', function ($scope, $timeout, $routeParams, postsService) {
    postsService.find($routeParams.id).success(function (post) {
      $scope.post = post
    })

    $scope.save = function (post) {
      postsService.update(post).success(function () {
        $scope.post = post
        $scope.saved = true
        $timeout(function () { $scope.saved = false }, 5000)
      })
    }
  })
