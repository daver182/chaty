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
		if(!check(email, pass)){
			return false;
		}

		blockUI.start();
		Auth.$authWithPassword({ email: email, password: pass }, { rememberMe: true }).then(
			redirect, showError
		);
	};

	$scope.createAccount = function(email, pass, confirm) {
		if(!check(email, pass, confirm)) return;
		blockUI.start();

		Auth.$createUser({email: email, password: pass})
			.then(function () {
				return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
			})
			.then(createProfile)
			.then(redirect, showError);
		

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

	function check(email, pass, confirm){
		if(!email){
			console.log('no email');
			swal({ title: 'Error', text: 'No ingresaste un correo', type: 'info', confirmButtonText: "OK" });
			return false;
		}

		if(!pass){
			swal({ title: 'Error', text: 'No ingresaste una contraseña', type: 'info', confirmButtonText: "OK" });
			return false;
		}

		if(confirm && pass !== confirm) {
			swal({ title: 'Error', text: 'Las contraseñas no coinciden', type: 'info', confirmButtonText: "OK" });
			return false;
		}

		return true;
	}


	function redirect() {
		blockUI.stop();
		$location.path('/account');
	}

	function showError(err) {
		blockUI.stop();
		swal({ title: 'Ha ocurrido un error', text: err, type: 'error', confirmButtonText: "OK" });
		
	}
});