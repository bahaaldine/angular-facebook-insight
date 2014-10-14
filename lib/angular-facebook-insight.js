/*! angular-facebook-insight - v0.6.4 - 2014-08-07
* Copyright (c) 2014 ; Licensed  */
  /*! angular-facebook-insight - v0.6.1 - 2014-07-13
* Copyright (c) 2014 ; Licensed  */
'use strict';

var page_id = 0;

angular.module("angular-facebook-insight",
  ["nvd3ChartDirectives", "googlechart", "r5.chart.directives"])

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