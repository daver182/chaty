'use strict';

/**
 * @ngdoc service
 * @name chatApp.online
 * @description
 * # online
 * Permite indicar que el usuario actual esta el linea
 */
angular.module('chatApp').service('online', function ($firebaseObject, Ref, notification, profile) {
	var onlineStatus = $firebaseObject(Ref.child('.info').child('connected'));
	var connected = false;
	
	this.on = function(uid, cb){
		var userRef = Ref.child('users').child(uid).child('online');
		var userStatus = $firebaseObject(userRef);

		onlineStatus.$watch(function(data) {
			if(data.key === 'connected' && !connected){
				connected = true;
				userRef.onDisconnect().set(false);
				userStatus.$value = true;
				userStatus.$save();

				notification.create(uid, 'online');
			}else{
				connected = false;
			}
		});
	}
});