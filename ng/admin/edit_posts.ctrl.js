angular.module('admin')
  .controller('EditPostCtrl', function ($scope, $timeout, $routeParams, PostsSvc) {
    PostsSvc.find($routeParams.id).success(function (post) {
      $scope.post = post
    })

    $scope.save = function (post) {
      PostsSvc.update(post).success(function (post) {
        $scope.post = post
        $scope.saved = true
        $timeout(function () { $scope.saved = false }, 5000)
      })
    }
  })
