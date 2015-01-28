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
.controller('PostCtrl', function($scope, $sce) {
  $scope.markup = $sce.trustAsHtml($scope.$parent.currentPost);
})
.controller('ServiceCtrl', function($scope, $state, fetchBlogService) {
  var handleSuccess = function(data, status) {
    $scope.posts = data;
    console.log('POSTS', $scope.posts);
  };

  var handlePostSuccess = function(data, status) {
    $scope.currentPost = data;
    //console.log('CURRENT POST', $scope.currentPost);
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