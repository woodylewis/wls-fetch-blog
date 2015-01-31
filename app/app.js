'use strict';

/* INJECT DEPENDENCIES */

angular.module('myApp', [
  'myApp.services',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', 
        function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
  .otherwise('/index');

  $stateProvider
    .state('index', {
      url: "/index",
      views: {
        "state" : { templateUrl: "partials/main_state.html" },
      }
    })
    .state('list', {
      url: "/list",
      views: {
        "state" : { templateUrl: "partials/blog_list.html" },
        }
    })
    .state('post', {
      url: "/post",
      views: {
        "state" : { 
                    templateUrl: "partials/blog_post.html" },
                    controller: 'PostCtrl',
      }
    })
}])
//------  INJECT STRICT CONTEXTUAL ESCAPING INTO VIEW CONTROLLER -----
.controller('PostCtrl', ['$scope', '$sce', '$anchorScroll', '$location', function($scope, $sce, $anchorScroll, $location) {
  $scope.markup = $sce.trustAsHtml($scope.$parent.currentPost);
  $location.hash('top');
  $anchorScroll();
}])
.controller('ServiceCtrl', function($scope, $state, fetchBlogService) {
  var handleSuccess = function(data, status) {
    $scope.posts = data;
    console.log('POSTS', $scope.posts);
  };

  function addRemoteDomain(payload) {
    //--- PREPEND DOMAIN TO IMAGE URLs --------
    var before1 = 'src="/';
    var before2 = 'src="/sites/default/files/';
    var after1 = 'src="http://woodylewis.com/';
    var after2 = 'src="http://woodylewis.com/sites/default/files/';
    var result1 = payload.split(before1).join(after1);
    var result2 = result1.split(before2).join(after2);

    return result2;
  }

  var handlePostSuccess = function(data, status) {
    // PREPEND REMOTE DOMAIN TO IMAGE LINKS
    $scope.currentPost = addRemoteDomain(data); 
    var postState = 'post';
    $state.go(postState);
  };

  fetchBlogService.fetchBlog()
          .success(handleSuccess);  

  $scope.showCurrentPost= function(nid) {
    $scope.currentPost = fetchBlogService.fetchBlogPost(nid)
    .success(handlePostSuccess);
  };
});