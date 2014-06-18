angular.module('admin')
  .controller('NavCtrl', function ($rootScope, authService) {
    authService.ensureAuthorized()

    authService.getCurrentUser().success(function (user) {
      $rootScope.user = user
    })
  })
