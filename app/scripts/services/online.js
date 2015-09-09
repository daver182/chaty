'use strict';

/**
 * @ngdoc service
 * @name chatApp.online
 * @description
 * # online
 * Service in the chatApp.
 */
angular.module('chatApp').service('online', function ($firebaseObject, Ref, notification) {
	var onlineStatus = $firebaseObject(Ref.child('.info').child('connected'));
	var connected = false;

	return {
		on: function(uid, cb){
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
	}
});