angular.module('xxx')
  .controller('TwitterCtrl', function ($scope, twitterService) {
    twitterService.fetch().success(function (tweets) {
      $scope.tweets = tweets
    })
  })
