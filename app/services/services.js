angular.module('myApp.services', [])

/* SERVICE TO WRAP HTTP REQUEST */

.factory('fetchBlogService' , function($http) {
	var blogUrl = 'http://woodylewis.com/wls_send.php';
	var blogPostUrl = 'http://woodylewis.com/wls_send_post.php?';

	var fetchBlog = function() {
		return $http ({
			method: 'GET',
			url: blogUrl
		});
	}

	var fetchBlogPost = function(nid) {
		return $http ({
			method: 'GET',
			url: blogPostUrl + nid
		});
	}

	//--- RETURN THE SERVICE OBJECT WITH METHODS -----
	return {
		fetchBlog: function() {
			return fetchBlog();
		},
		fetchBlogPost: function(nid) {
			return fetchBlogPost(nid);
		}
	};
});