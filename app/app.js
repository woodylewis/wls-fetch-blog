'use strict';

/* INJECT DEPENDENCIES */

angular.module('myApp', [
  'myApp.services',
	'ui.bootstrap',
	'ui.bootstrap.tpls'
])

.controller('ServiceCtrl', function($scope, $window, fetchBlogService) {
  var handleSuccess = function(data, status) {
    $scope.posts = data;
    console.log('POSTS', $scope.posts);
  };

  var handlePostSuccess = function(data, status) {
    $scope.currentPost = data;
    var w = open("","Fetched from woodylewis.com","", "");
    var str1 = $scope.currentPost;
    var str2 = str1.replace('img src="/', 'img src="http://woodylewis.com/');
    w.document.write(str2);
    console.log('CURRENT POST', str2);
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