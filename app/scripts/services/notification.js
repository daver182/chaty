'use strict';

/**
 * @ngdoc service
 * @name chatApp.notification
 * @description
 * # notification
 * Servicio que permite enviar una nueva notificacion a Firebase y muestra cualquier notificacion nueva
 */
angular.module('chatApp').service('notification', function (profile, webNotification, Ref, $firebaseObject, $firebaseArray) {
	this.watchUsers = function(usersRef){
		usersRef.$watch(function(data){
			$firebaseObject(Ref.child('users').child(data.key)).$loaded().then(function(user){
				if (user.$id === profile.getUser().uid) return;
				if(user.online){
					console.log(user, profile.getUser().uid);
					create(user.name, 'online');
				}
			});
		});
	}

	this.watchMessages = function(messagesRef, key){
		messagesRef.$watch(function(data){
			$firebaseObject(Ref.child('chats').child(key).child(data.key)).$loaded().then(function(message){
				if(message.author.id !== profile.getUser().uid){
					create(message.author.name, 'message');
				}
			});
		});
	}

	function create(username, type){
		if(type === 'online') {
			userStatus(username, true);
		} else if(type === 'offline') {
			userStatus(username, false);
		} else if(type === 'message') {
			newMessage(username);
		}
	}

    function userStatus(name, status){
    	var message = 'El usuario ' + name + ' se ha conectado al chat';
    	if(!status) message = 'El usuario ' + name + ' se ha desconectado del chat';

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
});