angular.module('xxx')
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    $routeProvider
    .when('/', {templateUrl: '/home.html' })
    .when('/admin', {templateUrl: '/admin/table.html', controller: 'AdminCtrl'})
    .when('/admin/posts/:id', {templateUrl: '/admin/edit_post.html', controller: 'AdminPostCtrl'})
  })
