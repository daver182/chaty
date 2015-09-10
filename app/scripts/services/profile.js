'use strict';

/**
 * @ngdoc service
 * @name chatApp.profile
 * @description
 * # profile
 * Este servicio permite obtener el perfil del usuario actual
 */
angular.module('chatApp').service('profile', function (Auth, Ref, $firebaseObject, $rootScope) {
	var that = this;
	$rootScope.$on('user:loaded', function(e, user){
		that.user = user;
	});

	this.getUser = function(){
		return this.user;
	}

	this.bind = function(id, scope, variable){
		return $firebaseObject(Ref.child('users').child(id)).$bindTo(scope, variable);
	}
});