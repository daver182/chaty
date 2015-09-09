'use strict';
/**
 * @ngdoc function
 * @name chatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Permite listar los usuario del sistema, seleccionar uno e intercambiar mensajes
 */
angular.module('chatApp').controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, user, blockUI, online, notification, profile) {
		profile.setId(user.uid);
		online.on(user.uid);

		blockUI.start('Cargando usuarios...');
		$firebaseArray(Ref.child('users')).$loaded().then(usersLoaded).catch(showError);
		function usersLoaded(users){
			$scope.users = users;
			blockUI.stop();
		}
		$scope.currentUser = {};
		$scope.me = user;

		$scope.load = function(remoteUser){
			blockUI.start('Cargando mensajes...');
			$scope.currentUser = remoteUser.$id;
			loadChat(remoteUser.$id, user.uid, true);
		}

		function loadChat(user1, user2, first){
			$firebaseArray(Ref.child('chats').child(user1 + '|' + user2)).$loaded().then(
				function(messages){
					if(messages.length === 0 && first){
						return loadChat(user2, user1, false);
					}

					return messagesLoaded(messages);
				}
			).catch(showError);;
		}

		function messagesLoaded(messages){
			$scope.messages = messages;
			blockUI.stop();
		}

		$scope.addMessage = function(newMessage) {
			if(newMessage && $scope.messages) {
				$scope.messages.$add({ author: user.uid, text: newMessage, date: new Date().valueOf() }).catch(showError);

				notification.create(user.uid, 'message');
			}
		};

		function showError(err) {
			blockUI.stop();
			swal({ title: 'Ha ocurrido un error', text: err, type: 'error', confirmButtonText: "OK" });
		}
});