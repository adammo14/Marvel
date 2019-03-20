'use strict';

/**
 * @ngdoc function
 * @name marvelAppApp.controller:CharactersCtrl
 * @description
 * # CharactersCtrl
 * Controller of the marvelAppApp
 */

//PROBLEM
//Marvel API only allows 100 comics/characters per request
//I tried to loop the $http requests synchronously and increment offset by 100
//each time but it didn't work. Stack overflow suggested promises but I don't fully
//understand them yet to make use of them. For that reason this app is limited to
//100 items on both comics and characters pages.

//I achieve 'infinite scroll' effect by incrementing an ng-repeat loop by 4 each
//time a button is pressed. 

//Loading times for the information to come through to the view are quite slow,
//this needs optimising. Potential improvements would also include better styling 
//for the additional information inside a modal or giving each comis/character 
//its own page based on an ID param for example (/characters/:id)


angular.module('marvelAppApp')
    .controller('CharactersCtrl', ['$scope', '$http', '$q', function($scope, $http, $q) {
        $scope.pageTitle = "Characters";
        $scope.timeStamp =  Date.now();
        $scope.publicKey ="80708435341cc86ac0b446aa5bae5a2b";
        $scope.privateKey = "8238b42dbc74e7065c0d6916dc9595bf3de8e085";
        $scope.baseUrl = "https://gateway.marvel.com/v1/public/characters";
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
        var limitStep = 4;
        $scope.limit = initialNumber;

        $scope.listData = function(){
          $scope.limit += limitStep;
          console.log($scope.limit + ' items in the view');
        };

        //Fancy hamburger menu
        $(document).ready(function(){
          $('#nav-icon').click(function(){
            $(this).toggleClass('open');
          });
        });
    }]);
