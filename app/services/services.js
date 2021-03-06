'use strict';

angular.module('myApp.services', [])
/* SERVICE TO WRAP HTTP REQUESTS */
.factory('fetchBlogService' , ['$q', '$http', 
	function($q, $http) {
		var blogUrl = 'http://woodylewis.com/wls_send.php';
		var blogPostUrl = 'http://woodylewis.com/wls_send_post.php?';

		var fetchBlog = function() {
			var deferred = $q.defer();

			$http.get(blogUrl)
			.success( function(data) {
				deferred.resolve(data);
			})
			.error(function(reason) {
				deferred.reject(reason);
			})
			return deferred.promise;
		}

		var fetchBlogPost = function(nid) {
			var deferred = $q.defer();

			$http.get(blogPostUrl + nid)
			.success( function(data) {
				deferred.resolve(data);
			})
			.error(function(reason) {
				deferred.reject(reason);
			})
			return deferred.promise;
		}

	return {
		fetchBlog: function() {
			return fetchBlog();
		},
		fetchBlogPost: function(nid) {
			return fetchBlogPost(nid);
		}
	};
}]);