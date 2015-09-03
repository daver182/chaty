angular.module('firebase.config', [])
  .constant('FBURL', 'https://zbox-chat.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
