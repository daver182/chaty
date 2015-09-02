'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('chatApp').controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $location, blockUI) {
	$scope.user = user;
	
	blockUI.start();

	$firebaseObject(Ref.child('users/' + user.uid)).$bindTo($scope, 'profile').then(function(){
		blockUI.stop();
	}).catch(error);

	$scope.logout = function() {
		Auth.$unauth();
		$location.path('/');
	};

	function error(err){
		console.log(err);
	}
});
