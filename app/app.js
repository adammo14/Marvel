var myPortfolioApp = angular.module('myPortfolioApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate']);

myPortfolioApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/landingPage.html',
      controller: 'portfolioController'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'portfolioController'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'portfolioController'
    })
    .when('/project/:id', {
      templateUrl: 'views/project.html',
      controller: 'portfolioController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'portfolioController'
    })
    .when('/thanks', {
      templateUrl: 'views/thanks.html',
      controller: 'portfolioController'
    })
    .otherwise({
      templateUrl: 'views/home.html',
      controller: 'portfolioController'
    });

  $locationProvider.html5Mode(true);
}]);

myPortfolioApp.controller('portfolioController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

  //Loads data from JSON file
  $http.get('data/projects.json').then(function(response) {
    $scope.projects = response.data;
  });

  //Grabs :id param from url and is used to fetch the correct object from json
  $scope.id = $routeParams.id;

}]);
