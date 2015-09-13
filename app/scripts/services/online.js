'use strict';

/**
 * @ngdoc service
 * @name chatApp.online
 * @description
 * # online
 * Permite indicar que el usuario actual esta el linea
 */
angular.module('chatApp').service('online', function ($firebaseObject, Ref, Auth, $rootScope) {
	var connectedRef = Ref.child('.info').child('connected');
	var connected = false;
	var that = this;

	Auth.$onAuth(function(user){
		$rootScope.$emit('user:loaded', user);

		var userRef = Ref.child('users').child(user.uid).child('online');	
		connectedRef.on('value', function(snap) {
			if (snap.val() === true) {
				userRef.onDisconnect().set(false);
				userRef.set(true);
				connected = true;
			}
		});
	});
});