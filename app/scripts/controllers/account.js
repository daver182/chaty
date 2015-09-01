'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('chatApp').controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $location) {
	$scope.user = user;
	
	var profile = $firebaseObject(Ref.child('users/' + user.uid));
	profile.$bindTo($scope, 'profile');

	$scope.logout = function() {
		Auth.$unauth();
		$location.path('/');
	};
});
