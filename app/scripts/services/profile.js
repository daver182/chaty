'use strict';

/**
 * @ngdoc service
 * @name chatApp.profile
 * @description
 * # profile
 * Este servicio permite obtener el perfil del usuario actual
 */
angular.module('chatApp').service('profile', function (Ref, $firebaseObject) {
	var uid;

	this.setId = function(uid) {
		this.uid = uid;
	};
	
	this.getId = function() {
		return this.uid;
	};

	this.getProfile = function(bind) {
		if(bind) return $firebaseObject(Ref.child('users/' + this.uid));
		return $firebaseObject(Ref.child('users/' + this.uid)).$loaded();
	};
});