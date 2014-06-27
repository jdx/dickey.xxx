angular.module('xxx')
  .controller('GithubCtrl', function ($scope, githubService) {
    githubService.fetchPublicEventsFor('dickeyxxx').success(function (events) {
      $scope.events = events.splice(0, 10)
    })
  })
