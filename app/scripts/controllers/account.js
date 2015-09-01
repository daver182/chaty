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
	var profile = $firebaseObject(Ref.child('users/' + user.uid)).$loaded().then(dataLoaded).catch(error);

	$scope.logout = function() {
		Auth.$unauth();
		$location.path('/');
	};

	function dataLoaded(data){
		$scope.profile = data;
		blockUI.stop();
	}

	function error(err){
		console.log(err);
	}
});
