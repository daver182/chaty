angular.module('firebase.config', [])
  .constant('FBURL', 'https://zbox-chat.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','twitter','github'])

  .constant('loginRedirectPath', '/login');
