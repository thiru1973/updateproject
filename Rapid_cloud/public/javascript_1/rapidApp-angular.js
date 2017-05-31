var rapidApp = angular.module('rapidApp', []);
    rapidApp.controller('designNetworkTemplateCtrl', function($scope){
	   $scope.networks = true;
	   $scope.template = false;
	   $scope.btnNetworks = function(){
		   $scope.networks = true;
		   $scope.template = false;
	   }
	   $scope.btnTemplates = function(){
		   $scope.template = true;
		   $scope.networks = false;
	   }
	});