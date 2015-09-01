'use strict';

/**
 * @ngdoc function
 * @name chatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatApp
 */
angular.module('chatApp').controller('MainCtrl', function ($scope, Auth, $location) {
    $scope.oauthLogin = function(provider) {
		$scope.err = null;
		Auth.$authWithOAuthPopup(provider, { rememberMe: true }).then(redirect, showError);
    };

    function redirect() {
		$location.path('/chat');
    }

    function showError(err) {
		$scope.err = err;
    }
});