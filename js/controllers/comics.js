'use strict';

/**
 * @ngdoc function
 * @name marvelAppApp.controller:ComicsCtrl
 * @description
 * # ComicsCtrl
 * Controller of the marvelAppApp
 */
angular.module('marvelAppApp')
  .controller('ComicsCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.pageTitle = "Comics";
    $scope.timeStamp =  Date.now();
    $scope.publicKey ="80708435341cc86ac0b446aa5bae5a2b";
    $scope.privateKey = "8238b42dbc74e7065c0d6916dc9595bf3de8e085";
    $scope.baseUrl = "https://gateway.marvel.com/v1/public/comics";
    $scope.hash = md5($scope.timeStamp+$scope.privateKey+$scope.publicKey);
    
    $http.get($scope.baseUrl, {
      params: {
        limit: 100,
        ts: $scope.timeStamp,
        apikey: $scope.publicKey,
        hash: $scope.hash
      }}).then(function(response){

      $scope.comics = response.data.data.results;

      var initialNumber = 8;
      var limitStep = 4;
      $scope.limit = initialNumber;

      $scope.listData = function(){
        $scope.limit += limitStep;
      };

    });

    //Fancy hamburger menu
    $(document).ready(function(){
      $('#nav-icon').click(function(){
        $(this).toggleClass('open');
      });
    });
}]);