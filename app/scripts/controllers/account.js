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
	}).catch(showError);

	$scope.logout = function() {
		Auth.$unauth();
		$location.path('/');
	};

	function showError(err) {
		blockUI.stop();
		swal({ title: 'Ha ocurrido un error', text: err, type: 'error', confirmButtonText: "OK" });
	}
});
