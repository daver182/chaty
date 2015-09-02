'use strict';

/**
 * @ngdoc overview
 * @name chatApp
 * @description
 * # chatApp
 *
 * Main module of the application.
 */
angular.module('chatApp', [
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'firebase.ref',
        'firebase.auth',
        'blockUI',
        'angularMoment'
    ]).config(function(blockUIConfig){
        blockUIConfig.message = 'Cargando...';
    }).run(function(amMoment){
        amMoment.changeLocale('es');
});
