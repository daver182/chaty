'use strict';

/**
 * @ngdoc service
 * @name chatApp.online
 * @description
 * # online
 * Service in the chatApp.
 */
angular.module('chatApp').service('online', function ($firebaseObject, Ref, notification) {
	var amOnline = new Firebase('https://zbox-chat.firebaseio.com/.info/connected');

	return {
		on: function(uid, cb){
			var userRef = new Firebase('https://zbox-chat.firebaseio.com/users/' + uid +'/online');
			
			amOnline.on('value', function(snapshot) {
				if (snapshot.val()) {
					userRef.onDisconnect().set(false);
					userRef.set(true);

					notification.create(uid, 'online');
				}
			});
		}
	}
});