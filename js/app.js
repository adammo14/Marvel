var marvelAppApp = angular
  .module('marvelAppApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/comics.html',
        controller: 'ComicsCtrl',
        controllerAs: 'comics'
      })
      .when('/characters', {
        templateUrl: 'views/characters.html',
        controller: 'CharactersCtrl',
        controllerAs: 'characters'
      })
      .otherwise({
        redirectTo: '/'
      });
  });