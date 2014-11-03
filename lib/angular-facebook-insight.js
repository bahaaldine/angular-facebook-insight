/*! angular-facebook-insight - v0.6.4 - 2014-08-07
* Copyright (c) 2014 ; Licensed  */
'use strict';

angular.module("angular-facebook-insight-tpls", 
  ["templates/fb-insight-dailyLine.html"
  ,"templates/fb-insight-feedbackBreakdown.html"
  ,"templates/fb-insight-genderBreakdown.html"
  ,"templates/fb-insight-geomap.html"
  ,"templates/fb-insight-hourlyLine"
  ,"templates/fb-insight-map.html"
  ,"templates/fb-insight-text.html"]);

angular.module("angular-facebook-insight",
  ["nvd3ChartDirectives", "googlechart"])

.service('Parser', ['$filter', function($filter) {
  return {
    getMapData: function(data, headers) {
      var dailyValuesList = [];
      for (var i = data.length - 1; i >= 0; i--) {
        var dailyValues = [headers];
        for( var key in data[i].value ) {
          var label = key;
          if ( key.indexOf(",") > -1 ) {
            label = key.split(',')[0];
          }
          dailyValues.push([label, label+ ": " + data[i].value[key]]);
        }
        dailyValuesList.push(dailyValues);
      };
      return dailyValuesList;
    },
    getGeoMapData: function(data, headers) {
      var dailyValuesList = [];

      for (var i = data.length - 1; i >= 0; i--) {
        var dailyValues = [headers];
        for( var key in data[i].value ) {
          var label = key;
          if ( key.indexOf("_") > -1 ) {
            label = key.split('_')[1];
          }
          dailyValues.push([label, data[i].value[key]]);
        }
        dailyValuesList.push(dailyValues);
      };
      return dailyValuesList;
    },
    getGauge: function(value, title) {
      return {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '60%'],
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#fff',
                    innerRadius: '90%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            },
            plotOptions: {
                solidgauge: {
                    innerRadius: '90%',
                    dataLabels: {
                        y: -45,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        },
        series: [{
            data: [value],
            dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:#444">{y}</span><span style="font-size:12px;color:silver"> %</span></div>'
          }
        }],
        title: {
            text: title,
            y: 50
        },
        credits: {
          enabled: false
        },
        yAxis: {
            currentMin: 0,
            currentMax: 100,
            title: {
                y: 140
            },      
            stops: [
                      [0.1, '#DF5353'], // red
                  [0.5, '#DDDF0D'], // yellow
                  [0.9, '#55BF3B'] // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            startOnTick:true,
            labels: {
                y: 15
            }   
        },
        loading: false
      };
    },
    getPie: function(data, title, shareName) {
      return {
        series:  [{
            type: 'pie',
            name: shareName,
            data: data
        }],
        title: {
            text: title
        },
        loading: false,
        credits: {
          enabled: false
        }
      }
    },
    getBar: function(data, title, shareName) {
      return {
        chart: {
            type: 'bar'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: ['Likes', 'Comments', 'Share']
        },
        yAxis: {
            min: 0
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
          name: shareName,
          type: 'column',
          data: data,
          id: 'series-3'
        }],
        size:{height:'300'},
      };
    },
    getSpider :function(categories, data, unit, title, shareName) {
      return {
        chart: {
            polar: true,
            type: 'line'
        },
        title: {
            text: title,
            x: -80
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: categories,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>'+unit+'{point.y:,.0f}</b><br/>'
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },
        series: [{
            name: shareName,
            data: data,
            pointPlacement: 'on'
        }]
      };
    }
  }; 
}])

.service('Facebook', ['$rootScope', function($rootScope) {
  return {
    getUserAndAccount: function() {
      FB.getLoginStatus(function(response) {
        if (response.status !== 'connected') {
          FB.login(function(data) { 
            $rootScope.$broadcast('token', data.authResponse.accessToken);
          },{'scope': 'read_insights,manage_pages'});
        } else {
          $rootScope.$broadcast('token', response.authResponse.accessToken);
        }
      });
    }
  }; 
}])

.service('FacebookInsightService', ['$rootScope', '$q', 'Parser', function($rootScope, $q, Parser) {

  var getPageInsights = function(page, token) {
    var deferred = $q.defer();
    FB.api('/'+page+'/insights?access_token='+token, function(response) {
      deferred.resolve(getInsightHashmap(response.data));
    });
    return deferred.promise;
  }

  var getPostInsights = function(post, token) {
    var deferred = $q.defer();
    FB.api('/'+post+'/insights?access_token='+token, function(response) {
      deferred.resolve(getInsightHashmap(response.data));
    });
    return deferred.promise;
  }

  var getInsightHashmap = function(rawInsights) {
    var insights = {};
    for ( var i=0, l=rawInsights.length; i<l; i++ ) {
      insights[rawInsights[i].name] = rawInsights[i];
    }
    return insights;
  }

  var getStoryTellers = function(insights) {
    var data = [
      insights['post_storytellers_by_action_type'].values[0].value.like,
      insights['post_storytellers_by_action_type'].values[0].value.comment,
      insights['post_storytellers_by_action_type'].values[0].value.share
    ];
    return Parser.getBar(data, "Engagement par type", "Type d\'engagement");
  }

  var getImpressions = function(insights) {
    var data = [
      ['Payant',   insights['post_impressions_by_paid_non_paid'].values[0].value.paid],
      {
          name: 'Naturel',
          y: insights['post_impressions_by_paid_non_paid'].values[0].value.unpaid,
          sliced: true,
          selected: true
      }
    ];

    return Parser.getPie(data, 'Reach Facebook Naturel Vs Payant', 'Impression share');
  }

  var getReach = function(insights) {
    return insights['post_impressions_unique'].values[0].value;
  }

  var getEngagementRate = function(insights) {
    var engagements = insights['post_story_adds_by_action_type_unique'];
    var impressions = insights['post_impressions_unique'];

    var likes = ( angular.isDefined(engagements.values[0].value.like) ) ? engagements.values[0].value.like : 0;
    var comments = ( angular.isDefined(engagements.values[0].value.comment) ) ? engagements.values[0].value.comment : 0;
    var shares = ( angular.isDefined(engagements.values[0].value.share) ) ? engagements.values[0].value.share : 0;

    var engagementRate = 0;
    if ( impressions.values[0].value > 0 ) {
      engagementRate = Math.round(((comments+likes+shares) / impressions.values[0].value) * 100);
    }


    return Parser.getGauge(engagementRate, "Taux d'engagement");
  }

  var getConversionRate = function(insights) {
    var consumptions = insights['post_consumptions_by_type_unique'];
    var stories = insights['post_story_adds_by_action_type_unique'];

    var likes = ( angular.isDefined(stories.values[0].value.like) ) ? stories.values[0].value.like : 0;
    var comments = ( angular.isDefined(stories.values[0].value.comment) ) ? stories.values[0].value.comment : 0;
    var shares = ( angular.isDefined(stories.values[0].value.share) ) ? stories.values[0].value.share : 0;

    var photoViews = ( angular.isDefined(consumptions.values[0].value['photo view']) ) ? consumptions.values[0].value['photo view'] : 0;
    var otherClicks = ( angular.isDefined(consumptions.values[0].value['other clicks']) ) ? consumptions.values[0].value['other clicks'] : 0;
    var linkClicks = ( angular.isDefined(consumptions.values[0].value['link clicks']) ) ? consumptions.values[0].value['link clicks'] : 0;

    var conversionRate = Math.round(((likes + shares + comments) / (photoViews + otherClicks + linkClicks))*100);


    return Parser.getGauge(conversionRate, "Taux de conversion");
  }

  var getInterestRate = function(insights) {
    var consumptions = insights['post_consumptions_by_type_unique'];
    var impressions = insights['post_impressions_unique'];

    var photoViews = ( angular.isDefined(consumptions.values[0].value['photo view']) ) ? consumptions.values[0].value['photo view'] : 0;
    var otherClicks = ( angular.isDefined(consumptions.values[0].value['other clicks']) ) ? consumptions.values[0].value['other clicks'] : 0;
    var linkClicks = ( angular.isDefined(consumptions.values[0].value['link clicks']) ) ? consumptions.values[0].value['link clicks'] : 0;

    var interestRate = 0;
    if ( impressions.values[0].value > 0 ) {
      interestRate = Math.round(((photoViews+otherClicks+linkClicks) / impressions.values[0].value) * 100);
    }

    return Parser.getGauge(interestRate, "Taux d'intérêt");
  }

  var getViralityRate = function(insights) {
    var virality = insights['post_impressions_viral_unique'];
    var impressions =  insights['post_impressions_unique'];
    var viralityRate = 0;
    if ( impressions.values[0].value > 0 ) {
      viralityRate = Math.round(( virality.values[0].value / impressions.values[0].value) * 100);
    }

    return Parser.getGauge(viralityRate, "Taux de viralité");
  }

  return {
    getPageInsights: getPageInsights,
    getPostInsights: getPostInsights,
    getImpressions: getImpressions,
    getReach: getReach,
    getStoryTellers: getStoryTellers,
    getEngagementRate: getEngagementRate,
    getConversionRate: getConversionRate,
    getInterestRate: getInterestRate,
    getViralityRate: getViralityRate
  } 
}])

.directive('ngFbPages', ['$rootScope', function($rootScope) {
  return {
    restrict: 'E',
    scope: {
      token: '='
    },
    templateUrl: 'templates/fb-insight-pages.html',
    link: function(scope, element) {
      scope.$watch('token', function(token) {
        if (token != null) {  
          FB.api('/me/accounts?access_token='+scope.token, function(response) {
            scope.$apply(function() {
              scope.pagesList = response.data;
            });
          });

          scope.updatePage = function(page) {
            FB.api('/'+page+'/feed?access_token='+scope.token, function(response) {
              scope.$apply(function() {
                scope.postsList = response.data;
              });
            });
          }

          scope.updatePost = function(post) {
            FB.api('/'+post+'?access_token='+scope.token, function(response) {
              $rootScope.$broadcast('post', response.id);
            });
          }
        }
      });
    }
  };
}])

.directive('ngFbInsight', ['$templateCache', 'Parser', function($templateCache, Parser) {
  return {
    restrict: 'EA',
    scope:{
      showTitle: '=',
      label:'@',
      template: '@',
      data:'='
    },
    template: '<div class="template" ng-include="fbTemplateUrl"></div>',
    link: function(scope, element, attrs) {
      scope.fbTemplateUrl = 'templates/fb-insight-'+scope.template+'.html';
    }
  };
}])

.directive('ngFbPostDetails', function() {
  return {
    restrict: 'EA',
    scope: {
      postId: '=',
      token: '='
    },
    templateUrl: 'templates/fb-post-details.html',
    link: function(scope, element, attrs) {
      scope.$watch('postId', function( postId ) {
        if ( angular.isDefined(postId) ) {
          FB.api('/'+scope.postId+'?access_token='+scope.token, function(response) {
            var postPicture = response.picture;
            if( angular.isDefined(response.picture ) && response.picture.match('url=(.*)') != null ) {
              postPicture = decodeURIComponent(response.picture.match('url=(.*)')[1]);
            }
            scope.post = {
              company: response.from.name,
              created: response.created_time,
              name: response.name,
              caption: response.caption,
              message: response.message,
              page: response.from.id,
              picture: postPicture
            };
            scope.$apply();
          });
        }
      });
    }
  };
})

.directive('geomap', [function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      fetch: '=  '
    },
    link: function(scope, element, attrs) {
      var geomap = new google.visualization.GeoMap(element[0]);
      scope.$watch('data', function(value) {
        if ( value != null ) {
          var data = google.visualization.arrayToDataTable(value);
          var options = {
            dataMode: 'regions',
            width: element.parent()[0].offsetWidth,
            height: 220,
            backgroundColor: '#ffffff'
          }
          geomap.draw(data, options);
        }
      });
      if ( typeof scope.fetch != "undefined") {
        scope.fetch();
      }
    }
  };

}])
.directive('map', [function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      fetch: '='
    },
    link: function(scope, element, attrs) {
      var map = new google.visualization.Map(element[0]);
      scope.$watch('data', function(value) {
        if ( value != null ) {
          var data = google.visualization.arrayToDataTable(value);
          var options = {
            showTip: true,
            width: element.parent()[0].offsetWidth
          }
          map.draw(data, options);
        }
      });
      if ( typeof scope.fetch != "undefined") {
        scope.fetch();
      }
    }
  };

}]);
