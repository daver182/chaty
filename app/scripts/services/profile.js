'use strict';

/**
 * @ngdoc service
 * @name chatApp.profile
 * @description
 * # profile
 * Este servicio permite obtener el perfil del usuario actual
 */
angular.module('chatApp').service('profile', function (Ref, $firebaseObject) {
	var id;

	return {
		setId: function(uid) {
			id = uid;
		},
		getId: function() {
			return id
		},
		getProfile: function(bind) {
			console.log(id);
			if(bind) return $firebaseObject(Ref.child('users/' + id));
			return $firebaseObject(Ref.child('users/' + id)).$loaded();
		}
	}
});