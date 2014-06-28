angular.module('xxx')
.controller('PostCtrl', function ($scope, $sce, $window, PostsSvc) {
  var path = $window.location.href.split('/')
  var postId = path[path.length - 1]
  PostsSvc.find(postId).success(function (post) {
    $scope.post = post
    $scope.body = $sce.trustAsHtml(post.body)
  })
})
