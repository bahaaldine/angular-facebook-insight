                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      w'use strict';

/**
 * @ngdoc overview
 * @name examplesApp
 * @description
 * # examplesApp
 *
 * Main module of the application.
 */
angular
  .module('examplesApp', [
    'ngResource',
    'ngRoute',
    'ngFastI18n',
    'ngFontChart',
    'angular-facebook-insight',
    'highcharts-ng'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'postCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
