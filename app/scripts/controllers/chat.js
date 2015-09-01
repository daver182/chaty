'use strict';
/**
 * @ngdoc function
 * @name chatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('chatApp').controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, user, blockUI) {
		blockUI.start('Cargando usuarios...');
		$firebaseArray(Ref.child('users')).$loaded().then(usersLoaded);
		function usersLoaded(users){
			$scope.users = users;
			blockUI.stop();
		}

		var profile = $firebaseObject(Ref.child('users/' + user.uid));
		profile.$bindTo($scope, 'profile');

		$scope.load = function(remoteUser){
			//$firebaseArray(Ref.child('chats').child(remoteUser.$id + '|' + user.uid)).$loaded().then(messagesLoaded);
			blockUI.start('Cargando mensajes...');
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
			);
		}

		function messagesLoaded(messages){
			$scope.messages = messages;
			blockUI.stop();
		}

		$scope.addMessage = function(newMessage) {
			if(newMessage && $scope.messages) {
				$scope.messages.$add({ author: profile.name, text: newMessage }).catch(alert);
			}
		};

		function alert(msg) {
			$scope.err = msg;
			$timeout(function() {
				$scope.err = null;
			}, 5000);
		}
		
});