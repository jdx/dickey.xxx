angular.module('admin')
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
    $routeProvider
    .when('/admin', {templateUrl: 'posts.html', controller: 'PostsCtrl'})
    .when('/admin/posts/:id', {templateUrl: 'edit_post.html', controller: 'EditPostCtrl'})
  })
