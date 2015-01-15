'use strict';

/* INJECT DEPENDENCIES */

angular.module('myApp', [
  'myApp.services',
	'ui.bootstrap',
	'ui.bootstrap.tpls'
])

.controller('ServiceCtrl', function($scope, fetchBlogService) {
  var handleSuccess = function(data, status) {
    $scope.posts = data;
    console.log('POSTS', $scope.posts);
  };

  $scope.posts = fetchBlogService.getPosts()
          .success(handleSuccess);  

  $scope.showPosts = false;
  $scope.toggle= function() {
    $scope.showPosts = !$scope.showPosts;
  };
});