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

  var handlePostSuccess = function(data, status) {
    $scope.currentPost = data;
    console.log('CURRENT POST', $scope.currentPost);
  };

  $scope.posts = fetchBlogService.fetchBlog()
          .success(handleSuccess);  

  $scope.showPosts = false;
  $scope.toggle= function() {
    $scope.showPosts = !$scope.showPosts;
  };

  $scope.showCurrentPost= function(nid) {
    $scope.currentPost = fetchBlogService.fetchBlogPost(nid)
    .success(handlePostSuccess);
  };
});