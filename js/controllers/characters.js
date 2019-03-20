'use strict';

/**
 * @ngdoc function
 * @name marvelAppApp.controller:CharactersCtrl
 * @description
 * # CharactersCtrl
 * Controller of the marvelAppApp
 */
angular.module('marvelAppApp')
    .controller('CharactersCtrl', ['$scope', '$http', '$q', function($scope, $http, $q) {
        $scope.pageTitle = "Characters";
        $scope.timeStamp =  Date.now();
        $scope.publicKey ="80708435341cc86ac0b446aa5bae5a2b";
        $scope.privateKey = "8238b42dbc74e7065c0d6916dc9595bf3de8e085";
        $scope.baseUrl = "http://gateway.marvel.com/v1/public/characters";
        $scope.hash = md5($scope.timeStamp+$scope.privateKey+$scope.publicKey);
        
        var loopRequests = function(offset){
          $http.get($scope.baseUrl, {
            params: {
              offset: offset,
              limit: 100,
              ts: $scope.timeStamp,
              apikey: $scope.publicKey,
              hash: $scope.hash
            }}).then(function(response){
    
            $scope.characters = response.data.data.results;
    
          });
        }
    
        var promises = [];

        for(var i = 0; i < 5; i++){
            $scope.offsetParam += 100;
            promises.push(loopRequests($scope.offsetParam));
        }

        $q.all(promises).then(results => console.log(results))
        

        var initialNumber = 8;
        var limitStep = 40;
        $scope.limit = initialNumber;

        $scope.listData = function(){
          $scope.limit += limitStep;
          console.log($scope.limit);
        };

        //Fancy hamburger menu
        $(document).ready(function(){
          $('#nav-icon').click(function(){
            $(this).toggleClass('open');
          });
        });
    }]);
