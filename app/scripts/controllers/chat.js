'use strict';
/**
 * @ngdoc function
 * @name chatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('chatApp').controller('ChatCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, user) {
		$scope.users = $firebaseArray(Ref.child('users'));
		var profile = $firebaseObject(Ref.child('users/' + user.uid));
		profile.$bindTo($scope, 'profile');

		$scope.load = function(remoteUser){
			$scope.messages = $firebaseArray(Ref.child('chats').child(user.uid + '|' + remoteUser.$id));
		}

		$scope.addMessage = function(newMessage) {
			if(newMessage && $scope.newMessage) {
				$scope.messages.$add({ author: profile.name, text: newMessage }).catch(alert);
			}
		};

		function alert(msg) {
			$scope.err = msg;
			$timeout(function() {
				$scope.err = null;
			}, 5000);
		}
		/*// synchronize a read-only, synchronized array of messages, limit to most recent 10
		$scope.messages = $firebaseArray(Ref.child('messages').limitToLast(10));

		// display any errors
		$scope.messages.$loaded().catch(alert);

		// provide a method for adding a message
		$scope.addMessage = function(newMessage) {
			if( newMessage ) {
				// push a message to the end of the array
				$scope.messages.$add({text: newMessage})
					// display any errors
					.catch(alert);
			}
		};

		function alert(msg) {
			$scope.err = msg;
			$timeout(function() {
				$scope.err = null;
			}, 5000);
		}*/
});