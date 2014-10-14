/*! angular-facebook-insight - v0.6.7 - 2014-10-14
* Copyright (c) 2014 ; Licensed  */
  /*! angular-facebook-insight - v0.6.1 - 2014-07-13
* Copyright (c) 2014 ; Licensed  */
'use strict';

var page_id = 0;

angular.module("angular-facebook-insight-tpls", 
  ["templates/fb-insight-overview.html"
  , "templates/fb-insight-fans-country.html"
  , "templates/fb-insight-impressions-country.html"
  , "templates/fb-insight-fans-demographic.html"
  , "templates/fb-insight-fans-online.html"
  , "templates/fb-insight-today-stats.html"
  , "templates/fb-insight-negative-feedbacks.html"
  , "templates/fb-insight-roi.html"
  , "templates/fb-insight-reach.html"
  , "templates/fb-insight-likes-sources.html"
  , "templates/fb-insight-views-sources.html"
  , "templates/fb-insight-referals.html"
  , "templates/fb-insight-stories-positive-feedbacks.html"
  , "templates/fb-insight-stories-talking-about.html"
  , "templates/fb-insight-stories-interaction.html"]);
/*! angular-facebook-insight - v0.6.4 - 2014-08-07
* Copyright (c) 2014 ; Licensed  */
  /*! angular-facebook-insight - v0.6.1 - 2014-07-13
* Copyright (c) 2014 ; Licensed  */
'use strict';

var page_id = 0;

angular.module("angular-facebook-insight",
  ["nvd3ChartDirectives", "googlechart"])

.service('Parser', ['$filter', function($filter) {
  return {
    getFeedbackBreakdownData: function(data) {
      var colors = {
        answer: "0,155,125",
        claim: "233,103,44",
        comment: "79,134,247",
        like: "221,45,41",
        link: "112,128,144",
        rsvp: "244,154,194"
      }
      var barChartValue = {
        answer: 0,
        claim: 0,
        comment: 0,
        like: 0,
        link: 0,
        rsvp: 0,
        data: {
          labels: [],
          datasets: []
        }
      };  
      var item = [];
      var itemData = [];

      for (var i = data.length - 1; i >= 0; i--) {   
        barChartValue.data.labels.push($filter('date')(new Date(data[i].end_time), 'd MMMM yyyy'));   
        for( var key in data[i].value ) {
          if ( typeof itemData[key] == "undefined" ) itemData[key] = [];
          itemData[key].push(data[i].value[key]);
          barChartValue[key] += data[i].value[key];
        }
      };

      for ( var feedback in itemData ) {
        item[feedback] = {
          label: feedback,
          fillColor: "rgba("+colors[feedback]+",0.5)",
          strokeColor: "rgba("+colors[feedback]+",0.8)",
          highlightFill: "rgba("+colors[feedback]+",0.75)",
          highlightStroke: "rgba("+colors[feedback]+",1)",
          data: []
        }
        item[feedback].data = itemData[feedback];
        barChartValue.data.datasets.push(item[feedback]);
      }

      var total = barChartValue.answer+barChartValue.claim+barChartValue.comment+barChartValue.like+barChartValue.link+barChartValue.rsvp;
      barChartValue.answer = Math.round(100*barChartValue.answer/total);
      barChartValue.claim = Math.round(100*barChartValue.claim/total);
      barChartValue.comment = Math.round(100*barChartValue.comment/total);
      barChartValue.like = Math.round(100*barChartValue.like/total);
      barChartValue.link = Math.round(100*barChartValue.link/total);
      barChartValue.rsvp = Math.round(100*barChartValue.rsvp/total);

      return barChartValue;
    },
    getGenderBreakdownData: function(data) {
      var dailyValuesList = [];
      for (var i = data.length - 1; i >= 0; i--) {
        var dailyValues = {
            male: 0,
            female: 0,
            data: {
              labels: [],
              datasets: [{
                label: "Female",
                fillColor: "rgba(222,165,164,0.5)",
                strokeColor: "rgba(222,165,164,0.8)",
                highlightFill: "rgba(222,165,164,0.75)",
                highlightStroke: "rgba(222,165,164,1)",
                data: []
              },
              {
                label: "Male",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: []
              }]
          }
        };

        for( var key in data[i].value ) {
          var label = key, sex = null;
          if ( key.indexOf(".") > -1 ) {
            sex = key.split('.')[0];
            label = key.split('.')[1];
          }

          if ( sex == "F") {
            dailyValues.female += data[i].value[key];
            dailyValues.data.labels.push(label);
            dailyValues.data.datasets[0].data.push(data[i].value[key]);
          } else if ( sex == "M" ) {
            dailyValues.male += data[i].value[key];
            dailyValues.data.datasets[1].data.push(data[i].value[key]);
          }
        }

        var total = dailyValues.male+dailyValues.female;

        dailyValues.female = Math.round(100*dailyValues.female/total);
        dailyValues.male = Math.round(100*dailyValues.male/total);

        dailyValuesList.push(dailyValues);
      };
      return dailyValuesList[dailyValuesList.length-1];
    },
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
    getDailyLineData: function(data) {
      var chartData = {
        labels: [],
        datasets: [{
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        }]
      };

      for (var i=0, l=data.length; i<l; i++) {
        chartData.labels[i] = $filter('date')(new Date(data[i].end_time), 'd MMMM yyyy');
        chartData.datasets[0].data[i] = data[i].value;
      }

      return chartData;
    },
    getHourlyLineData: function(data) {
      var hourlyDataList = [];
      for (var i=0, l=data.length; i<l; i++) {
        var hourlyData = {
          labels: [],
          datasets: [{
              label: "",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: []
          }]
        };
        for( var key in data[i].value ) {
          hourlyData.labels.push(key);
          hourlyData.datasets[0].data.push(data[i].value[key]);
        }
        hourlyDataList.push(hourlyData);
      }

      return hourlyDataList[hourlyDataList.length-1];
    }
  }; 
}])

.service('Facebook', function() {
  var getMonitoredPagesId = function(FB, scope) {         
      FB.getLoginStatus(function() {
        FB.api('/me', function(response) {
          //resolve(null, response, deferred);
        });

        FB.api(
          '/me/accounts?access_token='+scope.user.accessToken,function (resp) {
            var M = [];
            for(var i in resp.data){
              M[i]=resp.data[i];
            }
            scope.monitoredPages = M;
            scope.$apply();
        });            
      });
    };

  return {
    getUserAndAccount: function(FB, scope) {
      scope.page = {
        id: null
      }
      scope.user = null;

      FB.getLoginStatus(function(response) {
        if (response.status !== 'connected') {
          FB.login(function() {           
              FB.api('/me', function(response) {
                console.log(response)
                scope.user = response;
                scope.user.connected = true;
                scope.$apply();       
              });
              var access_token = FB.getAuthResponse()['accessToken'];
              getMonitoredPagesId(FB, scope, access_token);

          },{scope: 'read_insights,manage_pages'});
        }
        else if(response.status === 'connected') {
            FB.api('/me', function(response) {
              scope.user = response;
              scope.user.connected = true;
              scope.user.accessToken = FB.getAuthResponse()['accessToken'];
              scope.$apply();
              getMonitoredPagesId(FB, scope);
            });
        }
      });
    }
  }; 
})

.directive('ngFbUserInfo', function() {
  return {
    restrict: 'E',
    scope:true,
    transclude: true,
    template: '<div>{{user.first_name}} {{user.last_name}}</div>',
    link: function(scope, element) {
    }
  };
})

.directive('ngFbPages', function() {
  return {
    restrict: 'E',
    scope:true,
    template: '<select name="line" ng-model="page.id" size="1" ng-change="updatePage(page.id)"><OPTION ng-repeat="page in monitoredPages" value="{{page.id}}">{{page.name}}</option></select>',
    link: function(scope, element) {
      scope.updatePage = function(page) {

      }
    }
  };
})

.directive('ngFbInsight', ['$templateCache', 'Parser', function($templateCache, Parser) {
  return {
    restrict: 'E',
    scope:{
      page: '=',
      token: '=',
      api: '@'
    },
    template: '<div ng-include="fbTemplateUrl"></div>',
    link: function(scope, element, attrs) {
    
      scope.getAPIURL = function(page, api, accessToken, period) {
        if ( typeof accessToken === "undefined" ) {
          return '/'+page;
        }
        return '/'+page+'/insights/'+api+'/'+period+'?access_token='+accessToken;
      };

      scope.getParser = function(data, parser) {
        switch(attrs.parser) {
          case 'geomap':
            scope.title = data.data[0].title;
            scope.description = data.data[0].description;
            scope.data = Parser.getGeoMapData(data.data[0].values, ['Country', 'Popularity'])[0]; 
          break;
          
          case 'map':
            scope.title = data.data[0].title;
            scope.description = data.data[0].description;
            scope.data = Parser.getMapData(data.data[0].values, ['Country', 'Popularity'])[0]; 
          break;

          case 'bar':
            scope.title = data.data[0].title;
          break;

          case 'feedbackBreakdown':
            scope.title = data.data[0].title;
            scope.description = data.data[0].description;
            scope.data = Parser.getFeedbackBreakdownData(data.data[0].values); 
          break;

          case 'genderBreakdown':
            scope.title = data.data[0].title;
            scope.description = data.data[0].description;
            scope.data = Parser.getGenderBreakdownData(data.data[0].values); 
          break;

          case 'pie':
            scope.title = data.data[0].title;
          break;

          case 'dailyLine':
            scope.title = data.data[0].title;
            console.log(scope.title);
            scope.description = data.data[0].description;
            scope.data = Parser.getDailyLineData(data.data[0].values);  
          break;

          case 'hourlyLine':
            scope.title = data.data[0].title;
            scope.description = data.data[0].description;
            scope.data = Parser.getHourlyLineData(data.data[0].values);  
          break;

          case 'text':
            scope.title = 'Overview';
            scope.data = data;
          break;

          case 'log':
            scope.title = data.data[0].title;
            console.log(data)
          break;
        }
      }

      scope.$watch('page', function (page) {
        if (page != null) {
          scope.fbTemplateUrl = 'templates/fb-insight-'+attrs.parser+'.html';
          var apiURL = scope.getAPIURL(page, scope.api, scope.token, attrs.period);
          FB.api(apiURL, function(response) {
            if( typeof response.about != "undefined" || 
              (typeof response.data != "undefined" && typeof response.data[0] != "undefined") ) {
               scope.getParser(response, attrs.parser);
            }
            scope.$apply();
          });
        }
      });

    }
  };
}])
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

}])
.directive('barChart', [function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      fetch: '='
    },
        link: function(scope, element, attrs) {
          var map = new google.visualization.BarChart(element[0]);
      scope.$watch('data', function(value) {
        if ( value != null ) {
          var data = google.visualization.arrayToDataTable(value);
          var options = {
            hAxis: { 
              titleTextStyle: { 
                color: '#444'
              },
              baselineColor: 'transparent',
              gridlines: {
                    color: 'transparent'
              },
              textPosition: 'none'
            },
            vAxis: {
              textStyle: {
                fontSize: 16,
                fontName: 'Helvetica Neue',
                color: '#444'
              },
            },
            colors: ['#3a589b', '#c27866', '#6cd08b', '#d0d0d0',  '#5b8eca', '#d6492f'],
            legend: { position: "none" },
            chartArea: {width:"60%"},
          };
          map.draw(data, options);
        }
      });
      scope.fetch();
    }
  };

}])
.directive('column', [function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      fetch: '='
    },
        link: function(scope, element, attrs) {
          var map = new google.visualization.ColumnChart(element[0]);
      scope.$watch('data', function(value) {
        if ( value != null ) {
          var data = google.visualization.arrayToDataTable(value);
          var options = {
            width: element.parent()[0].offsetWidth,
            chartArea: {width: '60%'},
            bar: {groupWidth: "95%"},
            hAxis: {title: 'Answers', titleTextStyle: {color: '#444'}},
            colors: ['#55bc75', '#3a589b', '#5b8eca', '#d6492f']
              };
          map.draw(data, options);
        }
      });
      scope.fetch();
    }
  };

}])
.directive('line', [function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      fetch: '='
    },
        link: function(scope, element, attrs) {
          var map = new google.visualization.LineChart(element[0]);
          scope.$watch('data', function(data) {
            if ( data != null ) {
              var options = {
                width: element.parent()[0].offsetWidth,
                curveType: 'function',
                chartArea: {width: '80%'},
                legend: { position: 'bottom' },
                pointSize: 5
              };
              map.draw(data, options);
            }
          });
          scope.fetch();
    }
  };
}])
.directive('chart', function () {
  var baseWidth = 600;
  var baseHeight = 400;

  return {
    restrict: 'E',
    template: '<canvas></canvas>',
    scope: {
      chartObject: "=value"
    },
    link: function (scope, element, attrs) {
      var canvas  = element.find('canvas')[0],
          context = canvas.getContext('2d'),
          chart;

      var options = {
        type:   attrs.type   || "Line",
        width:  attrs.width  || baseWidth,
        height: attrs.height || baseHeight
      };
      canvas.width = options.width;
      canvas.height = options.height;
      chart = new Chart(context);

      scope.$watch(function(){ return element.attr('type'); }, function(value){
        if(!value) return;
        options.type = value;
        var chartType = options.type;
        chart[chartType](scope.chartObject, scope.chartObject.options);
      });

      //Update when charts data changes
      scope.$watch(function() { return scope.chartObject; }, function(value) {
        if(!value) return;
        var chartType = options.type;
        chart[chartType](scope.chartObject, scope.chartObject.options);
      });
    }
  }
});
angular.module('templates/fb-insight-fans-country.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-fans-country.html',
    "<section id=\"overview\" ng-show=\"overview\">\n" +
    "      <div class=\"main-inner\">\n" +
    "        <div class=\"span7\"  >\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-bookmark\"></i>\n" +
    "              <h3>General infos</h3>\n" +
    "            </div>\n" +
    "              <div  style=\"height:118px;\" class=\"widget-content\"  \n" +
    "                <u1 ng-repeat=\"i in overview.generalinfodata\">\n" +
    "                  <p style=\"font-size:13px; font-weight:bold;\">{{i.info}}<p>\n" +
    "                </u1>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"span6\" style=\"width:550px;\" >\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-cloud \"></i>\n" +
    "              <h3>Word Cloud</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\">\n" +
    "<img src=\"https://graph.facebook.com/{{overview.pageid}}/picture\" style=\"width:400px; height:428px;\" />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div> \n" +
    " </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-fans-demographic.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-fans-demographic.html',
    "<section id=\"fans\" ng-show=\"fans\"> \n" +
    "          <div class=\"main-inner\">\n" +
    "              <div class=\"container\">\n" +
    "                  <div class=\"row\">\n" +
    "                    <div class=\"span6\" >\n" +
    "                          <div class=\"widget\">\n" +
    "                              <div class=\"widget-header\">\n" +
    "                                  <i class=\"icon-bar-chart\"></i>\n" +
    "                                  <h3>Gender & Age Demographics</h3> \n" +
    "                              </div>\n" +
    "                                <div class=\"widget-content\" style=\"width: 538px;height:450px;\">\n" +
    "                                  <p style=\"font-size:11px;\">Gender and age demographics of your Page fans</p>\n" +
    "                                  <nvd3-discrete-bar-chart\n" +
    "                                      data=\"fans.fanagegenderdata\"\n" +
    "                                        id=\"fan_age_gender_data_id\"\n" +
    "                                        showXAxis=\"true\"\n" +
    "                                        showYAxis=\"true\"\n" +
    "                                        width=\"580\"\n" +
    "                                        height=\"405\"\n" +
    "                                        interactive=\"true\"\n" +
    "                                        showControls=\"true\"   \n" +
    "                                        tooltips=\"true\">\n" +
    "                                    </nvd3-discrete-bar-chart>                                  \n" +
    "                                </div>\n" +
    "                          </div>\n" +
    "                      </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-fans-online.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-fans-online.html',
    "<section id=\"fans\" ng-show=\"fans\"> \n" +
    "          <div class=\"main-inner\">\n" +
    "              <div class=\"container\">\n" +
    "                  <div class=\"row\">\n" +
    "                      <div class=\"span6\" >\n" +
    "                          <div class=\"widget\">\n" +
    "                              <div class=\"widget-header\">\n" +
    "                                  <i class=\"icon-bar-chart\"></i>\n" +
    "                                  <h3>Fans'Online Activity</h3> \n" +
    "                              </div>\n" +
    "                                <div class=\"widget-content\" style=\"width: 538px;height:450px;\">\n" +
    "                                    <p style=\"font-size:11px;\">Number of your Page fans broken down by when they are online </p>\n" +
    "                                <nvd3-discrete-bar-chart\n" +
    "                                    data=\"fans.fanonlinedata\"\n" +
    "                                      id=\"fan_online_data_id\"\n" +
    "                                      showXAxis=\"true\"\n" +
    "                                      showYAxis=\"true\"\n" +
    "                                      width=\"580\"\n" +
    "                                      height=\"405\"\n" +
    "                                      interactive=\"true\"\n" +
    "                                      showControls=\"true\"   \n" +
    "                                      tooltips=\"true\">\n" +
    "                                  </nvd3-discrete-bar-chart>                                  \n" +
    "                                </div>\n" +
    "                          </div>\n" +
    "                      </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-impressions-country.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-impressions-country.html',
    "<section id=\"geographics\" ng-show=\"geographics\">\n" +
    "          <div class=\"main-inner\">\n" +
    "              <div class=\"container\">\n" +
    "                  <div class=\"row\">\n" +
    "                      <div class=\"span6\">\n" +
    "                          <div class=\"widget\">\n" +
    "                              <div class=\"widget-header\">\n" +
    "                                  <i class=\"icon-bar-chart\"></i>\n" +
    "                                  <h3>Countries</h3>\n" +
    "                              </div>\n" +
    "                                <div class=\"widget-content\" style=\"width: 538px; height: 410px;\">\n" +
    "                                  <div google-chart=\"geochart\" ng-model=\"mapdata\" id=\"chart_div\"></div>\n" +
    "                             </div>\n" +
    "                          </div>\n" +
    "                      </div>\n" +
    "                      <div class=\"span6\">\n" +
    "\n" +
    "                          <div class=\"widget\">\n" +
    "                              <div class=\"widget-header\">\n" +
    "                                  <i class=\"icon-bar-chart\"></i>\n" +
    "                                  <h3>Languages</h3> \n" +
    "                              </div>\n" +
    "                               <div class=\"widget-content\" style=\"width: 538px; height: 410px;\">\n" +
    "                                <p style=\"font-size:11px;\">Languages spoken by your Page fans </p>\n" +
    "                                  <nvd3-pie-chart\n" +
    "                                   data=\"geographics.languagedata\"\n" +
    "                                   id=\"language_data_id\"\n" +
    "                                   height=\"400\"\n" +
    "                                   width=\"600\"                                   \n" +
    "                                   x=\"geographics.xFunction()\"\n" +
    "                                   y=\"geographics.yFunction()\"\n" +
    "                                   donut=\"true\"\n" +
    "                                   showLegend=\"true\" \n" +
    "                                   tooltips=\"true\"  \n" +
    "                                   labelType=\"value\" > \n" +
    "                                  </nvd3-pie-chart>\n" +
    "                              </div> \n" +
    "                      </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-likes-sources.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-likes-sources.html',
    "<section id=\"sources\" ng-show=\"sources\"> \n" +
    "         <div class=\"container\">\n" +
    "        <div class=\"span5\" style=\" width:550px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-thumbs-up\"></i>\n" +
    "              <h3>Like Sources</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:400px;\">\n" +
    "                  <p style=\"font-size:10px;\">Number of people who liked your Page today, broken down by the most common places where people can like your Page</p>\n" +
    "                <nvd3-discrete-bar-chart\n" +
    "                    data=\"sources.likesources\"\n" +
    "                      id=\"data_like_sources_id\"\n" +
    "                      showControls=\"true\"   \n" +
    "                      tooltips=\"true\"\n" +
    "                      showLegend=\"true\"\n" +
    "                      showXAxis=\"true\"\n" +
    "                      showYAxis=\"true\"\n" +
    "                      interactive=\"true\"\n" +
    "                      width=\"580\"\n" +
    "                      height=\"350\"\n" +
    "                      showValues=\"true\">\n" +
    "                  </nvd3-discrete-bar-chart>                  \n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>         \n" +
    "      </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-negative-feedbacks.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-negative-feedbacks.html',
    "<section id=\"negativefeed\" ng-show=\"negativefeed\"> \n" +
    "        <div class=\"container\">\n" +
    "              <div class=\"span12\">\n" +
    "                   <div class=\"widget-header\"> <i class=\" icon-remove-circle \"></i>\n" +
    "                <h3>Negative Feedback</h3>\n" +
    "              </div>\n" +
    "              <div class=\"info-box\"  style=\" height:400px;\">\n" +
    "                 <div class=\"row-fluid stats-box\">\n" +
    "                    <div class=\"span4\">\n" +
    "                      <div class=\"stats-box-title\">Unlikes</div>\n" +
    "                      <div class=\"stats-box-all-info\"><i class=\"icon-thumbs-down\" style=\"color:#F30;\"></i>  {{negativefeed.unlikes}}</div>\n" +
    "                      <div class=\"wrap-chart\"><div id=\"visitor-stat\" class=\"chart\">Number of your Page unlikes from the most common places where people can unlike your Page</div></div>\n" +
    "                      </div>\n" +
    "                    <div class=\"span4\">\n" +
    "                      <div class=\"stats-box-title\">Reports</div>\n" +
    "                      <div class=\"stats-box-all-info\"><i class=\"icon-file\"  style=\"color:#F30;\"></i>  {{negativefeed.reports}}</div>\n" +
    "                      <div class=\"wrap-chart\"><div id=\"visitor-stat\" class=\"chart\">Number of people who reported your Page</div></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"span4\">\n" +
    "                      <div class=\"stats-box-title\">Hide Requests</div>\n" +
    "                      <div class=\"stats-box-all-info\"><i class=\"icon-eye-close\" style=\"color:#F30;\"></i>  {{negativefeed.hiderequests}}</div>\n" +
    "                      <div class=\"wrap-chart\"><div id=\"visitor-stat\" class=\"chart\">Number of people who asked to hide your Page or any of its posts</div></div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "           </div>     \n" +
    "        </div> \n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-overview.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-overview.html',
    "<section id=\"overview\" ng-show=\"overview\">\n" +
    "      <div class=\"main-inner\">\n" +
    "        <div class=\"span7\"  >\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-bookmark\"></i>\n" +
    "              <h3>General infos</h3>\n" +
    "            </div>\n" +
    "              <div  style=\"height:118px;\" class=\"widget-content\"  \n" +
    "                <u1 ng-repeat=\"i in overview.generalinfodata\">\n" +
    "                  <p style=\"font-size:13px; font-weight:bold;\">{{i.info}}<p>\n" +
    "                </u1>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"span6\" style=\"width:550px;\" >\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-cloud \"></i>\n" +
    "              <h3>Word Cloud</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\">\n" +
    "<img src=\"https://graph.facebook.com/{{overview.pageid}}/picture\" style=\"width:400px; height:428px;\" />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div> \n" +
    " </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-reach.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-reach.html',
    "<section id=\"reach\" ng-show=\"reach\">\n" +
    "            <div class=\"main-inner\">           \n" +
    "                <div class=\"span5\">\n" +
    "                    <div class=\"widget-header\"> <i class=\"icon-list\"></i>\n" +
    "                      <h3>Reach Impressions By Type</h3>\n" +
    "                    </div>\n" +
    "                    <div class=\"info-box\"  style=\" height:455px;\"> \n" +
    "                        <div class=\"row-fluid stats-box\">\n" +
    "\n" +
    "                            <div class=\"stats-box-title\">Organic Impressions</div>\n" +
    "                            <div class=\"stats-box-all-info\"><i class=\"icon-cogs\" style=\"color:#F30;\"></i>{{reach.organicdata}}<p style=\"font-size:10px;\">Number of people who visited your Page, or saw one of its posts in news feed or ticker</p></div>\n" +
    "                      \n" +
    "                            <div class=\"stats-box-title\">Paid Impressions</div>\n" +
    "                            <div class=\"stats-box-all-info\"><i class=\"icon-money\" style=\"color:#3C3\"></i>{{reach.paiddata}}<p style=\"font-size:10px;\">Number of impressions of a Sponsored Story or Ad pointing to your Page</p></div>\n" +
    "                      \n" +
    "                            <div class=\"stats-box-title\">Viral Impressions</div>\n" +
    "                            <div class=\"stats-box-all-info\"><i class=\"icon-comments-alt\" style=\"color:#3366cc;\"></i>  {{reach.viraldata}}<p style=\"font-size:10px;\">Number of people who saw your Page or any of its posts from a story shared by a friend</p></div>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "          <div class=\"span8\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-retweet\"></i>\n" +
    "              <h3>Reach Evolution</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:420px;\">\n" +
    "            <nvd3-stacked-area-chart\n" +
    "                data=\"reach.reachevolutiondata\"\n" +
    "                  id=\"reach_id\"\n" +
    "                  showXAxis=\"true\"\n" +
    "                  showYAxis=\"true\"\n" +
    "                    width=\"720\"\n" +
    "                  height=\"400\"\n" +
    "                  showLegend=\"true\"\n" +
    "                  showControls=\"true\"   \n" +
    "                  xAxisTickFormat=\"reach.xAxisTickFormatFunction()\"     \n" +
    "                  useInteractiveGuideline=\"true\"        \n" +
    "                  interactive=\"true\"\n" +
    "                  tooltips=\"true\"\n" +
    "                  labelType=\"value\">\n" +
    "            </nvd3-stacked-area-chart>    \n" +
    "           </div>            \n" +
    "          </div>\n" +
    "        </div>\n" +
    "        </div> \n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-referals.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-referals.html',
    "<section id=\"referrals\" ng-show=\"referrals\">\n" +
    " <div class=\"container\">\n" +
    "        <div class=\"span5\" style=\" width:550px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-signout\"></i>\n" +
    "              <h3>Internal Referrers</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:400px;\">\n" +
    "                  <p>Internal referrals to your Page</p>              \n" +
    "            <h1 ng-repeat=\"referral in referrals.internaldata\">\n" +
    "              <br> \n" +
    "              <br>{{referral}}\n" +
    "            </h1>              \n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>         \n" +
    "        <div class=\"span5\"  style=\" width:550px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-signin\"></i>\n" +
    "              <h3>External Referrers</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:400px;\">\n" +
    "                  <p>External referrals to your Page</p>              \n" +
    "            <h1 ng-repeat=\"referral in referrals.externaldata\">\n" +
    "              <br> \n" +
    "              <br>{{referral}}\n" +
    "            </h1>              \n" +
    "            </div>\n" +
    "          </div>          \n" +
    "        </div> \n" +
    "      </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-roi.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-roi.html',
    "<section id=\"roi\" ng-show=\"roi\">\n" +
    "      <div class=\"container\">\n" +
    "      <div class=\"main-inner\">\n" +
    "          <div class=\"container\">\n" +
    "           <div class=\"row\">\n" +
    "              <div class=\"span12\">\n" +
    "                          <div class=\"widget-header\"> <i class=\" icon-beaker \"></i>\n" +
    "                <h3>This month...</h3>\n" +
    "              </div>\n" +
    "              <div class=\"info-box\"  style=\" height:400px;\">\n" +
    "                 <div class=\"row-fluid stats-box\">\n" +
    "                    <div class=\"span4\">\n" +
    "                      <div class=\"stats-box-title\">Page Impressions Rate</div>\n" +
    "                      <div class=\"stats-box-all-info\"><i class=\"icon-fire\" style=\"color:#3366cc;\"></i>{{roi.impressionrate}}%</div>\n" +
    "                      <div class=\"wrap-chart\"><div id=\"visitor-stat\" class=\"chart\">Seen impressions rate of any content associated with your Page through this month</div></div>\n" +
    "                      </div>\n" +
    "                      <div class=\"span4\">\n" +
    "                      <div class=\"stats-box-title\">Page Reach Ratio</div>\n" +
    "                      <div class=\"stats-box-all-info\"><i class=\"icon-magic\" style=\"color:#3366cc;\"></i>{{roi.reachrate}}</div>\n" +
    "                      <div class=\"wrap-chart\"><div id=\"visitor-stat\" class=\"chart\">Number of people your Page reached regarding your Page's fan-base</div></div>\n" +
    "                      \n" +
    "                      </div>\n" +
    "                    <div class=\"span4\">\n" +
    "                      <div class=\"stats-box-title\">Engagement Rate</div>\n" +
    "                      <div class=\"stats-box-all-info\"><i class=\"icon-magnet\"  style=\"color:#3366cc;\"></i>{{roi.engagementrate}}%</div>\n" +
    "                      <div class=\"wrap-chart\"><div id=\"visitor-stat\" class=\"chart\">Users engagement rate regarding your Page's fan-base</div></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                 </div>  \n" +
    "               </div>   \n" +
    "           </div>\n" +
    "           </div>      \n" +
    "          </div> \n" +
    "</section> "
  );

}]);

angular.module('templates/fb-insight-stories-interaction.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-stories-interaction.html',
    "<section id=\"stories\" ng-show=\"stories\">\n" +
    "       <div class=\"container\">        \n" +
    "        <div class=\"span4\" style=\" width:360px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-sitemap\"></i>\n" +
    "              <h3>People Interaction</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:350px;\">\n" +
    "                <nvd3-stacked-area-chart\n" +
    "                    data=\"stories.interactiondata\"\n" +
    "                      id=\"data_interaction_id\"\n" +
    "                      showXAxis=\"true\"\n" +
    "                      showYAxis=\"true\"\n" +
    "                      width=\"330\"\n" +
    "                      height=\"350\"\n" +
    "                      xAxisTickFormat=\"stories.xAxisTickFormatFunction()\"  \n" +
    "                      useInteractiveGuideline=\"true\"        \n" +
    "                      interactive=\"true\"\n" +
    "                      tooltips=\"true\"\n" +
    "                      labelType=\"value\">\n" +
    "                  </nvd3-stacked-area-chart>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-stories-positive-feedbacks.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-stories-positive-feedbacks.html',
    "<section id=\"stories\" ng-show=\"stories\">\n" +
    "       <div class=\"container\">\n" +
    "        <div class=\"span4\"  style=\" width:360px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-plus-sign\"></i>\n" +
    "              <h3>Positive Feedback</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:350px;\">\n" +
    "                <nvd3-discrete-bar-chart\n" +
    "                    data=\"stories.positivefeedbackdata\"\n" +
    "                      id=\"data_positive_feedback_id\"\n" +
    "                      showXAxis=\"true\"\n" +
    "                      showYAxis=\"true\"\n" +
    "                      tooltips=\"true\"                      \n" +
    "                      width=\"380\"\n" +
    "                      height=\"380\"\n" +
    "                      showValues=\"true\"\n" +
    "                      interactive=\"true\"\n" +
    "                      useInteractiveGuideline=\"true\">\n" +
    "                  </nvd3-discrete-bar-chart>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div> \n" +
    "      </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-stories-talking-about.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-stories-talking-about.html',
    "<section id=\"stories\" ng-show=\"stories\">\n" +
    "       <div class=\"container\">\n" +
    "        <div class=\"span4\" style=\" width:360px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-comment\"></i>\n" +
    "              <h3>People talking about it</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:350px;\">\n" +
    "                  <nvd3-discrete-bar-chart\n" +
    "                    data=\"stories.talkingaboutdata\"\n" +
    "                      id=\"data_talking_id\"\n" +
    "                      showControls=\"true\"   \n" +
    "                      tooltips=\"true\"\n" +
    "                      showLegend=\"true\"\n" +
    "                      showXAxis=\"true\"\n" +
    "                      showYAxis=\"true\"\n" +
    "                      interactive=\"true\"\n" +
    "                      width=\"380\"\n" +
    "                      height=\"380\"\n" +
    "                      showValues=\"true\">\n" +
    "                  </nvd3-discrete-bar-chart>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>         \n" +
    "      </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-today-stats.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-today-stats.html',
    "<section id=\"todaystats\" ng-show=\"todaystats\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"widget-header\"> \n" +
    "            <i class=\"icon-signal\"></i>\n" +
    "            <h3>Today's Stats</h3>\n" +
    "          </div>\n" +
    "\n" +
    "        <div class=\"widget-content\">\n" +
    "          <div class=\"big-stats-container\" style=\"position:relative; left:140px; right:140px\">\n" +
    "              <div id=\"big_stats\" >\n" +
    "              <div class=\"stat\"><i class=\"icon-thumbs-up-alt\"></i> <span class=\"value\">{{todaystats.todaytotalfans}}</span></br><b>Likes</b><p style=\"font-size:11px;\">Total number of people who have liked your Page</p></div>\n" +
    "\n" +
    "              <div class=\"stat\"><i class=\"icon-eye-open\"></i> <span class=\"value\">{{todaystats.todayviewstats}}</span></br><b>Views</b><p style=\"font-size:11px;\">Total number of your Page's views for today</p></div>\n" +
    "                \n" +
    "              <div class=\"stat\"> <i class=\"icon-hand-up\"></i> <span class=\"value\">{{todaystats.todayclicks}}</span></br><b>Clicks</b><p style=\"font-size:11px;\">number of clicks on any of your content</p></div>\n" +
    "              </div></br>\n" +
    "              <br>\n" +
    "              <br>\n" +
    "              <div id=\"big_stats\">\n" +
    "                  <div class=\"stat\"><i class=\"icon-bullhorn\"></i> <span class=\"value\">{{todaystats.talkingaboutstats}}</span></br><b>Talking About</b><p style=\"font-size:11px;\">Number of people who were talking about your Page today</p></div>\n" +
    "                  <div class=\"stat\"><i class=\"icon-magnet\"></i> <span class=\"value\">{{todaystats.todayengagedusers}}</span></br><b>Engaged Users</b><p style=\"font-size:11px;\">Number of people who engaged with your Page. Engagement includes any click or story created</p></div>\n" +
    "                  <div class=\"stat\"> <i class=\"icon-bell\"></i> <span class=\"value\">{{todaystats.todayonlinefans}}</span></br><b>Online Fans</b><p style=\"font-size:11px;\">Number of people who liked your Page and who were online today</p></div>\n" +
    "              </div>\n" +
    "\n" +
    "          </div>   \n" +
    "\n" +
    "        </div>\n" +
    "</section>"
  );

}]);

angular.module('templates/fb-insight-views-sources.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-views-sources.html',
    "<section id=\"sources\" ng-show=\"sources\"> \n" +
    "         <div class=\"container\">\n" +
    "        <div class=\"span5\" style=\" width:550px;\">\n" +
    "          <div class=\"widget\">\n" +
    "            <div class=\"widget-header\"> <i class=\"icon-thumbs-up\"></i>\n" +
    "              <h3>Like Sources</h3>\n" +
    "            </div>\n" +
    "            <div class=\"widget-content\"  style=\" height:400px;\">\n" +
    "                  <p style=\"font-size:10px;\">Number of people who liked your Page today, broken down by the most common places where people can like your Page</p>\n" +
    "                <nvd3-discrete-bar-chart\n" +
    "                    data=\"sources.likesources\"\n" +
    "                      id=\"data_like_sources_id\"\n" +
    "                      showControls=\"true\"   \n" +
    "                      tooltips=\"true\"\n" +
    "                      showLegend=\"true\"\n" +
    "                      showXAxis=\"true\"\n" +
    "                      showYAxis=\"true\"\n" +
    "                      interactive=\"true\"\n" +
    "                      width=\"580\"\n" +
    "                      height=\"350\"\n" +
    "                      showValues=\"true\">\n" +
    "                  </nvd3-discrete-bar-chart>                  \n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>         \n" +
    "      </div>\n" +
    "</section>"
  );

}]);
