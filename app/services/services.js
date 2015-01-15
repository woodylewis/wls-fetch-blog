angular.module('myApp.services', [])

/* SERVICE TO WRAP HTTP REQUEST */

.factory('fetchBlogService' , function($http) {
	var blogUrl = 'http://woodylewis.com/wls_send.php';

	var fetchBlog = function() {
		return $http ({
			method: 'GET',
			url: blogUrl
		});
	}

	return {
		getPosts: function() {
			return fetchBlog();
		}
	};
});