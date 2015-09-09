'use strict';

/**
 * @ngdoc service
 * @name chatApp.notification
 * @description
 * # notification
 * Service in the chatApp.
 */
angular.module('chatApp').service('notification', function (profile, webNotification) {
	var stateRef = new Firebase('https://zbox-chat.firebaseio.com/notification');

	stateRef.on('value', function(snapshot) {
		console.log(snapshot.val());
		var data = snapshot.val();
		
		if(!data) return;
		if(data.user.id === profile.getId()) return;
		
		if(data.type === 'online') {
			newUser(data.user.name);
		} else if(data.type === 'message') {
			newMessage(data.user.name);
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
			if (!error) {
				console.log('Se mostrado correctamente la notificacion');
			}
		});
    }

    return {
    	create: function(uid, type){
    		profile.getProfile().then(function(user){
				stateRef.set({ user: { id: profile.getId(), name: user.name }, type: type, time: Firebase.ServerValue.TIMESTAMP });
			});
    	}
    }
});