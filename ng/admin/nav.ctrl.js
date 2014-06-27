angular.module('admin')
  .controller('NavCtrl', function ($rootScope, authService) {
    authService.getCurrentUser().success(function (user) {
      $rootScope.user = user
    }).error(function () {
      authService.redirectToLogin()
    })
  })
