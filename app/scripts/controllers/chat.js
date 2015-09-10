'use strict';
/**
 * @ngdoc function
 * @name chatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Permite listar los usuario del sistema, seleccionar uno e intercambiar mensajes
 */
angular.module('chatApp').controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, user, blockUI, online, notification, profile) {
	profile.bind(user.uid, $scope, 'profile').catch(showError);

	blockUI.start('Cargando usuarios...');
	$firebaseArray(Ref.child('users')).$loaded().then(usersLoaded).catch(showError);
	function usersLoaded(users){
		$scope.users = users;
		blockUI.stop();
		notification.watchUsers(users);
	}
	$scope.currentUser = {};
	$scope.me = user;

	$scope.load = function(remoteUser){
		blockUI.start('Cargando mensajes...');
		$scope.currentUser = remoteUser.$id;
		loadChat(remoteUser.$id, user.uid, true);
	}

	function loadChat(user1, user2, first){
		var key = user1 + '|' + user2;
		$firebaseArray(Ref.child('chats').child(key)).$loaded().then(
			function(messages){
				if(messages.length === 0 && first){
					return loadChat(user2, user1, false);
				}

				return messagesLoaded(messages, key);
			}
		).catch(showError);
	}

	function messagesLoaded(messages, key){
		$scope.messages = messages;
		blockUI.stop();
		notification.watchMessages(messages, key);
	}

	$scope.addMessage = function(newMessage) {
		if(newMessage && $scope.messages) {
			$scope.messages.$add({ author: { id: user.uid, name: $scope.profile.name }, text: newMessage, date: new Date().valueOf() }).catch(showError);
		}
	};

	function showError(err) {
		blockUI.stop();
		swal({ title: 'Ha ocurrido un error', text: err, type: 'error', confirmButtonText: "OK" });
	}
});