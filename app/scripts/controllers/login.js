'use strict';
/**
 * @ngdoc function
 * @name chatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('chatApp').controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout, blockUI) {
	Auth.$onAuth(function(user){
		if(user && $location.path() === '/login'){
			return $location.path('/account');
		}
	});

	$scope.passwordLogin = function(email, pass) {
		blockUI.start();
		$scope.err = null;
		Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true }).then(
			redirect, showError
		);
	};

	$scope.createAccount = function(email, pass, confirm) {
		$scope.err = null;
		blockUI.start();
		if(!pass) {
			$scope.err = 'No ingresaste una contraseña';
		}
		else if(pass !== confirm) {
			$scope.err = 'Las contraseñas no coinciden';
		}
		else {
			Auth.$createUser({email: email, password: pass})
				.then(function () {
					return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
				})
				.then(createProfile)
				.then(redirect, showError);
		}

		function createProfile(user) {
			var ref = Ref.child('users').child(user.uid), def = $q.defer();
			ref.set({ email: email, name: chance.name() }, function(err) {
				$timeout(function() {
					if( err ) {
						def.reject(err);
					}
					else {
						blockUI.stop();
						def.resolve(ref);
					}
				});
			});
			return def.promise;
		}
	}


	function redirect() {
		blockUI.stop();
		$location.path('/account');
	}

	function showError(err) {
		$scope.err = err;
	}
});