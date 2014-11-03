'use strict';

angular.module('examplesApp')
.controller('MainCtrl', ['$scope', 'Facebook', '$rootScope', function($scope, Facebook, $rootScope) {
	Facebook.getUserAndAccount();
}])
.controller('postCtrl', ['$scope', 'Facebook', '$rootScope', 'FacebookInsightService', function($scope, Facebook, $rootScope, FacebookInsightService) {
	Facebook.getUserAndAccount();
	
	$rootScope.$on('token', function(event, data) {
		$scope.$apply(function() {
			$scope.token = data;
		});
	});	

	$rootScope.$on('post', function(event, data) {
		$scope.$apply(function() {
			$scope.postId = data;
			FacebookInsightService.getPostInsights($scope.postId, $scope.token).then(function(insights) {
				$scope.postInsights = insights;
				$scope.reach = FacebookInsightService.getReach(insights);
				$scope.impressions = FacebookInsightService.getImpressions(insights);
				$scope.storyTellers = FacebookInsightService.getStoryTellers(insights);
				$scope.engagementRate = FacebookInsightService.getEngagementRate(insights);
				$scope.conversionRate = FacebookInsightService.getConversionRate(insights);
				$scope.interestRate = FacebookInsightService.getInterestRate(insights);
				$scope.viralityRate = FacebookInsightService.getViralityRate(insights);
			});
		});
	});
}]);



