'use strict';
/**
 * @ngdoc function
 * @name chatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('chatApp').controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout) {
	Auth.$onAuth(function(user){
		if(user && $location.path() === '/login'){
			return $location.path('/account');
		}
	});

	$scope.passwordLogin = function(email, pass) {
		$scope.err = null;
		Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true }).then(
			redirect, showError
		);
	};

	$scope.createAccount = function(email, pass, confirm) {
		$scope.err = null;
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
			ref.set({ email: email, name: chance.word() }, function(err) {
				$timeout(function() {
					if( err ) {
						def.reject(err);
					}
					else {
						def.resolve(ref);
					}
				});
			});
			return def.promise;
		}
	}


	function redirect() {
		$location.path('/account');
	}

	function showError(err) {
		$scope.err = err;
	}
});