angular.module('xxx')
  .controller('GithubCtrl', function ($scope, githubService) {
    githubService.fetchPublicEventsFor('dickeyxxx').success(function (response) {
      $scope.events = response.data.splice(0, 20)
    })
  })
