'use strict';

/**
 * @ngdoc service
 * @name chatApp.online
 * @description
 * # online
 * Permite indicar que el usuario actual esta el linea
 */
angular.module('chatApp').service('online', function ($firebaseObject, Ref, Auth, $rootScope) {
	var onlineStatus = $firebaseObject(Ref.child('.info').child('connected'));
	var connected = false;
	var that = this;

	Auth.$onAuth(function(user){
		$rootScope.$emit('user:loaded', user);

		var userRef = Ref.child('users').child(user.uid).child('online');
		var userStatus = $firebaseObject(userRef);

		onlineStatus.$watch(function(data) {
			if(data.key === 'connected' && !connected){
				connected = true;
				userRef.onDisconnect().set(false);
				userStatus.$value = true;
				userStatus.$save();
			}else{
				connected = false;
			}
		});
	});
});