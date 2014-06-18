angular.module('xxx')
  .controller('PostsCtrl', function ($scope, postsService) {
    postsService.fetch().success(function (posts) {
      $scope.posts = posts
    })
  })
