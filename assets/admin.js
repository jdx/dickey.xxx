angular.module('xxx')
  .controller('AdminCtrl', function ($scope, postsService, $window, authService) {
    if (!authService.loggedIn) {
      $window.location.href = '/github/auth'
    }
    var reload = function () {
      postsService.fetch().success(function (posts) {
        $scope.posts = posts
      })
    }

    reload()

    $scope.newPost = {}
    $scope.create = function (post) {
      postsService.create(post).success(function () {
        reload()
        $scope.newPost = {}
      })
    }
  })

angular.module('xxx')
  .controller('AdminPostCtrl', function ($scope, $routeParams, postsService) {
    var setPost = function (post) { $scope.post = post }

    postsService.find($routeParams.id).success(setPost)

    $scope.unpublish = function (post) {
      postsService.unpublish(post._id).success(setPost)
    }

    $scope.publish = function (post) {
      postsService.publish(post._id).success(setPost)
    }
  })

angular.module('xxx')
  .factory('authService', function ($location, $window) {
    if ($location.search().jwt) {
      $window.localStorage.jwt = $location.search().jwt;
    }
    return {
      loggedIn: !!$window.localStorage.jwt,
      jwt: $window.localStorage.jwt
    }
  })

angular.module('xxx')
  .factory('postsService', function ($http, authService) {
    return {
      fetch: function () {
        return $http.get('/api/posts')
      },
      find: function (id) {
        return $http.get('/api/posts/' + id)
      },
      create: function (post) {
        return $http.post('/api/posts', post, {
          headers: { 'Authorization': 'Bearer ' + authService.jwt }
        })
      },
      unpublish: function (id) {
        return $http.post('/api/posts/' + id + '/unpublish', {}, {
          headers: { 'Authorization': 'Bearer ' + authService.jwt }
        })
      },
      publish: function (id) {
        return $http.post('/api/posts/' + id + '/publish', {}, {
          headers: { 'Authorization': 'Bearer ' + authService.jwt }
        })
      }
    }
  })
