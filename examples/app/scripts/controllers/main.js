'use strict';

angular.module('examplesApp')
.controller('MainCtrl', function($scope, Facebook) {
	Facebook.getUserAndAccount(FB, $scope);
});

