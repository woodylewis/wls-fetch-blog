'use strict';

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
                    controller: 'PostCtrl'
      }
    })
}])
.controller('PostCtrl', ['$scope', '$sce', '$anchorScroll', '$location', function($scope, $sce, $anchorScroll, $location) {
  //------  STRICT CONTEXTUAL ESCAPING OF CONTENT FROM REMOTE DOMAIN -----
  $scope.markup = $sce.trustAsHtml($scope.$parent.currentPost);
  //----- OLDER POSTS FURTHER DOWN THE LIST NEED TO BE SCROLLED TO THEIR TOP LINE
  $location.hash('top');
  $anchorScroll();
}])
.controller('ServiceCtrl', ['$scope', '$state', 'fetchBlogService', function($scope, $state, fetchBlogService) {
  fetchBlogService.fetchBlog()
  .then(function(data) {
    $scope.posts = data;
    console.log('posts', $scope.posts);
  }), function (error) {
      console.log('get posts error', error);
  };

  function addRemoteDomain(payload) {
    //--- PREPEND DOMAIN TO IMAGE URLs, HANDLE BOTH CASES -----
    var before1 = 'src="/';
    var before2 = 'src="/sites/default/files/';
    var after1 = 'src="http://woodylewis.com/';
    var after2 = 'src="http://woodylewis.com/sites/default/files/';
    var result1 = payload.split(before1).join(after1);
    var result2 = result1.split(before2).join(after2);
    return result2;
  }

  $scope.showCurrentPost= function(nid) {
    fetchBlogService.fetchBlogPost(nid)
    .then(function(data) {
      $scope.currentPost = addRemoteDomain(data); 
      var postState = 'post';
      $state.go(postState);
    }), function(error){
        console.log('get posts error', error);
    };
  };
}]);