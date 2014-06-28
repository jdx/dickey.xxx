angular.module('xxx')
.controller('PostsCtrl', function ($scope, PostsSvc) {
  PostsSvc.fetch().success(function (posts) {
    $scope.posts = posts
  })
})
