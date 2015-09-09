'use strict';

/**
 * @ngdoc service
 * @name chatApp.notification
 * @description
 * # notification
 * Service in the chatApp.
 */
angular.module('chatApp').service('notification', function (profile, webNotification, Ref, $firebaseObject) {
	//var stateRef = new Firebase('https://zbox-chat.firebaseio.com/notification');
	
	var lastNotification = $firebaseObject(Ref.child('notification'));
	var first = true;

	lastNotification.$watch(function(data) {
		console.log('watch', data);
		if(first) {first = false; return;}
		

		console.log(lastNotification);
		if(!lastNotification) return;
		if(lastNotification.user.id === profile.getId()) return;

		if(lastNotification.type === 'online') {
			newUser(lastNotification.user.name);
		} else if(lastNotification.type === 'message') {
			newMessage(lastNotification.user.name);
		}
	});
	

    function newUser(name){
    	var message = 'El usuario ' + name + ' se ha conectado al chat';
    	showNotification('Nuevo usuario', message);
    }

    function newMessage(name){
    	var message = 'El usuario ' + name + ' ha escrito un nuevo mensaje';
    	showNotification('Nuevo mensaje', message);
    }

    function showNotification(title, message){
    	webNotification.showNotification(title, {
			body: message,
			icon: 'images/logo.png',
			autoClose: 4000
		}, function onShow(error, hide) {
			if (error) {
				console.log(error);
			}
		});
    }

    return {
    	create: function(uid, type){
    		console.log('create');
    		profile.getProfile().then(function(user){
    			var notification = $firebaseObject(Ref.child('notification'));
    			notification.$value = { user: { id: profile.getId(), name: user.name }, type: type, time: new Date().valueOf() };
    			notification.$save();
			});
    	}
    }
});