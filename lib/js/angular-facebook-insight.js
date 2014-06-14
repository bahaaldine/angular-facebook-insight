'use strict';

var page_id = 0;

angular.module("angular-facebook-insight", ['nvd3ChartDirectives', 'googlechart'])

.service('Facebook', function($q, $rootScope) {
  getMonitoredPagesId = function(FB, scope, access_token) {         
      FB.getLoginStatus(function(response) {
        FB.api('/me', function(response) {
          resolve(null, response, deferred);
        });

        FB.api(
          '/me/accounts?access_token='+access_token,function (resp) {
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
    getUserAndAccount: function(FB, varscope) {
      FB.getLoginStatus(function(response) {
        if (response.status != 'connected') {
          FB.login(function(response) {           
              FB.api('/me', function(response) {
                varscope.user = response;
                varscope.user.connected = true;
                varscope.$apply();       
              });
              var access_token = FB.getAuthResponse()['accessToken'];
              getMonitoredPagesId(FB, varscope, access_token);

          },{scope: 'read_insights,manage_pages'});
        }
        else if(response.status == 'connected') {
            FB.api('/me', function(response) {
              varscope.user = response;
              varscope.user.connected = true;
              varscope.$apply();
              var access_token =  FB.getAuthResponse()['accessToken'];
              getMonitoredPagesId(FB, varscope, access_token);
            });
        }
    });
  }, 
  }; 
})

.directive('facebookInsight', function() {
    var directive = {};
    directive.restrict = 'EA'; 
    directive.templateUrl="facebook-insight.html";
    directive.scope = {
        overview : "=overview",
        todaystats : "=todaystats",
        reach : "=reach",
        sources : "=sources",
        referrals : "=referrals",
        stories : "=stories",
        geographics : "=geographics",
        fans : "=fans",
        negativefeed : "=negativefeed",
        roi : "=roi",
    };
    return directive;
})

.controller('MainCtrl', function($scope, Facebook) {
  Facebook.getUserAndAccount(FB, $scope);
})

.controller('nvd3Ctrl', function( $scope ) { 
    $scope.overview = {};
    $scope.todaystats={}; 
    $scope.reach = {}; 
    $scope.sources = {}; 
    $scope.referrals={}; 
    $scope.stories={}; 
    $scope.geographics = {}; 
    $scope.fans={}; 
    $scope.negativefeed = {}; 
    $scope.roi = {};

    var page_impressions_week = []; 
    var page_impressions_paid = [];
    var page_impressions_viral = [];  
    var page_impressions_organic = [];

    var page_impressions_week_time = [];
    var page_impressions_paid_time = [];
    var page_impressions_viral_time = []; 
    var page_impressions_organic_time = [];
    
    var page_fans_by_like_source = [];

    var page_views_time = [];

    var page_storytellers_by_story_type = [];
    var page_positive_feedback_by_type = [];
    var page_story_adds_by_story_type = [];
    var page_storytellers = [];
    var page_storytellers_time = [];

    var value_gender_age = [];
    var data_gender_age = [];
    var value_language = [];
    var data_language = [];
    var data_fan_online = [];

// PAGE INFOS
  $scope.getPageInfo = function(pageid) {
    page_id = pageid;
    var svg = d3.selectAll(" svg");
    svg.remove();
    
    $scope.overview.pageid = page_id;

      FB.api('/'+page_id, function(response){
          var pageArray = [];
          var pageArray1 = [];
          var pageArray3 = [];
          var pageArray5 = [];

          FB.api('/'+page_id, function(response) {
            $scope.overview.generalinfodata.push({"name": "Website","info": response.website});  
            $scope.overview.generalinfodata.push({"name": "Category","info": response.category}); 
            $scope.overview.generalinfodata.push({"name": "description","info": response.description}); 

            $scope.todaystats.talkingaboutstats = response.talking_about_count;
            $scope.$apply();
          });
          var access_token =  FB.getAuthResponse()['accessToken'];

// GEOGRAPHICS : MAP
     FB.api('/'+page_id+'/insights/page_fans_country/lifetime?access_token='+access_token,function (response) {
              var json = [response.data[0].values[0].value];
              
              var getKeyValueFromJSON = function (response) {
                  var i=1;
                  var keytest = []; 
                  keytest[0] = "Country";
                  var valuetest = [];
                  valuetest[0] = "Fans";
                  var jsonObj = response.data[0].values[0].value;
                  for(var key in jsonObj) {
                    keytest[i] = key;
                    valuetest[i] = jsonObj[key];
                    i = i+1;
                  }
                  return [keytest,valuetest];
              };

              var re = getKeyValueFromJSON(response);
              var Country = re[0];
              var Fans = re[1];
              var mapdata = [];
              for (var j=0; j<Country.length; j++){
                  mapdata[j]=[Country[j],Fans[j]];
              }
              google.load('visualization', '1', {'packages': ['geochart']})
              // MAP
              var drawRegionsMap = function (mapdata) {
                  var data = google.visualization.arrayToDataTable(mapdata);
                  var options = {
                    'width':550,
                    'height':420};
                  var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                  chart.draw(data, options);

                };
              google.setOnLoadCallback(drawRegionsMap(mapdata));
        
           });

// GEOGRAPHICS : LANGUAGES
          FB.api('/'+page_id+'/insights/page_impressions_by_locale_unique/days_28?access_token='+access_token,function (response) {
                var json = [response.data[0].values[0].value];
                
                var getKeyValueFromJSON = function (response) {
                  var i=0;
                  var keytest = [];
                  var valuetest = [];
                  var jsonObj = response.data[0].values[0].value;
                  for(var key in jsonObj) {
                    keytest[i] = key;
                    valuetest[i] = jsonObj[key];
                    i = i+1;
                  }
                  return [keytest,valuetest];
                };

                var re = getKeyValueFromJSON(response);
                
                var key = re[0];
                var value_language = re[1];
              
                for (var j=0; j<key.length; j++){
                  var item = {key: key[j], y: value_language[j]};
                  data_language.push(item);
                }
                $scope.geographics.xFunction = function(){
                    return function(d) {
                        return d.key;
                    };
                };
                $scope.geographics.yFunction = function(){
                  return function(d){
                    return d.y;
                  };
                };
                $scope.geographics.languagedata = data_language;
                $scope.$apply();
          });

// FANS : DEMOGRAPHICS
 FB.api('/'+page_id+'/insights/page_impressions_by_age_gender_unique/days_28?access_token='+access_token,function (response) {
           
                var json = [response.data[0].values[0].value];
                
                var getKeyValueFromJSON = function (response) {
                  var i=0;
                  var keytest = [];
                  var valuetest = [];
                  var jsonObj = response.data[0].values[0].value;
                  for(var key in jsonObj) {
                    keytest[i] = key;
                    valuetest[i] = jsonObj[key];
                    i = i+1;
                  }
                  return [keytest,valuetest];
                };

                var re = getKeyValueFromJSON(response);
                
                var key = re[0];
                var value_gender_age = re[1];
               
                for (var j=0; j<key.length; j++){
                  var item = {key: key[j], y: value_gender_age[j]};
                  data_gender_age.push(item);
                }

                $scope.fans.xFunction = function(){
                    return function(d) {
                        return d.key;
                    };
                };
                $scope.fans.yFunction = function(){
                  return function(d){
                    return d.y;
                  };
                };

                $scope.fans.fanagegenderdata = data_gender_age;
                $scope.$apply();
          });

// FANS : ONLINE ACTIVITY
          FB.api('/'+page_id+'/insights/page_fans_online/day?access_token='+access_token,function (response) {         
                var getKeyValueFromJSON = function (response) {
                  var i=0;
                  var keyfans = []; 
                  var valuefans = [];
                  var jsonObj = response.data[0].values[0].value;
                  for(var key in jsonObj) {
                    keyfans[i] = key;
                    valuefans[i] = jsonObj[key];
                    i = i+1;
                  }
                  return [keyfans,valuefans];
                };

                var re = getKeyValueFromJSON(response);
                var key = re[0];
                var data_fan_online = re[1];
                var data_fans = [];

                $scope.xFunction = function(){
                    return function(d) {
                        return d.key;
                    };
                };
                $scope.yFunction = function(){
                  return function(d){
                    return d.y;
                  };
                };
                for (var j = 0; j<key.length; j++){
                  data_fans[j] = [key[j], data_fan_online[j]];
                }

                $scope.$apply(function(){
                  $scope.fans.fanonlinedata =[
                    {
                      "key": "fans per hour",
                      "values": data_fans
                    }                                                
                  ];
                });
               
          });

// TODAY'S STATS
          var fans; var engaged_users;
          FB.api('/'+page_id+'/insights/page_views/day?access_token='+access_token,function (response) {
              $scope.todaystats.todayviewstats = response.data[0].values[0].value;
              $scope.$apply();
          });
          FB.api(
              '/'+page_id+'/insights/page_fans/lifetime?access_token='+access_token,function (response) {
              $scope.todaystats.todaytotalfans = response.data[0].values[0].value;
              $scope.$apply();
          }); 
          FB.api(
              '/'+page_id+'/insights/page_engaged_users/day?access_token='+access_token,function (response) {
              $scope.todaystats.todayengagedusers = response.data[0].values[0].value;  
              $scope.$apply();            
          });  

          FB.api(
              '/'+page_id+'/insights/page_consumptions/day?access_token='+access_token,function (response) { 
              $scope.todaystats.todayclicks = response.data[0].values[0].value;
              $scope.$apply();
          });
          FB.api(
              '/'+page_id+'/insights/page_fans_online_per_day/day?access_token='+access_token,function (response) {
              $scope.todaystats.todayonlinefans = response.data[0].values[0].value;
              $scope.$apply();
          });          

// NEGATIVE FEEDBACK  
          FB.api(
              '/'+page_id+'/insights/page_negative_feedback_by_type_unique/week?access_token='+access_token,function (response) {
              $scope.$apply(function(){
                $scope.negativefeed.unlikes = response.data[0].values[2].value.unlike_page_clicks;
              });
          });
          FB.api(
              '/'+page_id+'/insights/page_negative_feedback_by_type_unique/week?access_token='+access_token,function (response) {
              $scope.$apply(function(){
                $scope.negativefeed.reports = response.data[0].values[2].value.report_spam_clicks;
              });        
          });
          FB.api(
              '/'+page_id+'/insights/page_negative_feedback_by_type_unique/week?access_token='+access_token,function (response) {
              $scope.$apply(function(){
                $scope.negativefeed.hiderequests = response.data[0].values[2].value.hide_all_clicks;
              });
              
              
          }); 

// ROI 
FB.api('/'+page_id+'/insights/page_fans/lifetime?access_token='+access_token,function (response){
    $scope.roi.totalfans = response.data[0].values[0].value;


//ROI: ENGAGEMENT RATE    
    if (true){
        FB.api('/'+page_id+'/insights/page_engaged_users/days_28?access_token='+access_token,function(response){
            $scope.roi.engagedusers = response.data[0].values[0].value;  
            $scope.roi.engagementrate=((($scope.roi.engagedusers)/($scope.roi.totalfans))*100).toFixed(2);
            if (typeof($scope.roi.engagementrate) == 'undefined' || $scope.roi.engagementrate == 'NaN'|| $scope.roi.impressionrate == 'Infinity'){
              $scope.roi.engagementrate="No Data";
            }
             $scope.$apply();
           

// ROI : REACH RATE
            if (true){
                FB.api(
                  '/'+page_id+'/insights/page_impressions/days_28?access_token='+access_token,function (response) {
                    $scope.roi.reachmonthcount = response.data[0].values[0].value;
                    $scope.roi.reachrate=((($scope.roi.reachmonthcount)/($scope.roi.totalfans))).toFixed(2);
                        if (typeof($scope.roi.reachrate) == 'undefined' || $scope.roi.reachrate == 'NaN'|| $scope.roi.impressionrate == 'Infinity'){
                            $scope.roi.reachrate="No Data";
                        }
                    $scope.$apply();

// ROI : IMPRESSION RATE
                    if (true){
                          FB.api(
                           '/'+page_id+'/insights/page_consumptions/days_28?access_token='+access_token,function (response) {
                            $scope.roi.impressionmonthcount = response.data[0].values[0].value;
                            $scope.roi.impressionrate=((($scope.roi.impressionmonthcount)/($scope.roi.totalfans))*100).toFixed(2);
                            if (typeof($scope.roi.impressionrate) == 'undefined' || $scope.roi.impressionrate == 'NaN'|| $scope.roi.impressionrate == 'Infinity'){
                              $scope.roi.impressionrate="No Data";
                            }
                            $scope.$apply();
                            }); 
                    }
                });
            }
        });
     }
});

  

// PAGE INFOS : GENERAL INFOS                
          $scope.pageInfo = pageArray;
          $scope.overview.generalinfodata = pageArray1;
          $scope.$apply();


// PAGE REACH

       
    FB.api('/'+page_id+'/insights/page_impressions_organic/day?access_token='+access_token,function (response) {
      $scope.reach.organicdata = response.data[0].values[2].value;

      page_impressions_organic[0]=response.data[0].values[0].value;
      page_impressions_organic[1]=response.data[0].values[1].value;
      page_impressions_organic[2]=response.data[0].values[2].value;      

      for (var i=0; i<page_impressions_organic.length; i++){
        if (page_impressions_organic[i]== null || isNAN(page_impressions_organic) ){
          page_impressions_organic =0;
        }
        var end_time = response.data[0].values[i]["end_time"];
        var timedate = new Date (end_time);
        var xtime = timedate.getTime();
        page_impressions_organic_time[i] = xtime;
        if (page_impressions_organic_time[i] == null) {
          page_impressions_organic_time = 0;
        }
      }  

        if (true){
              FB.api(
                '/'+page_id+'/insights/page_impressions_paid/day?access_token='+access_token,function (response) {
                $scope.reach.paiddata = response.data[0].values[2].value;

                page_impressions_paid[0]=response.data[0].values[0].value;
                page_impressions_paid[1]=response.data[0].values[1].value;
                page_impressions_paid[2]=response.data[0].values[2].value;

                for (var i=0; i<page_impressions_paid.length; i++){
                  if (page_impressions_paid[i]== null || isNAN(page_impressions_paid[i]) ){
                    page_impressions_paid =0;
                  }
                  var end_time = response.data[0].values[i]["end_time"];
                  var timedate = new Date (end_time);
                  var xtime = timedate.getTime();
                  page_impressions_paid_time[i] = xtime;
                  if (page_impressions_paid_time[i] == null) {
                    page_impressions_paid_time = 0;
                  }
                } 
              }); 

              if (true){
                    FB.api(
                        '/'+page_id+'/insights/page_impressions_viral/day?access_token='+access_token,function (response) {
                        $scope.reach.viraldata = response.data[0].values[2].value;

                        page_impressions_viral[0]=response.data[0].values[0].value;
                        page_impressions_viral[1]=response.data[0].values[1].value;
                        page_impressions_viral[2]=response.data[0].values[2].value;  

                        for (var i=0; i<page_impressions_viral.length; i++){
                          if (page_impressions_viral[i]== null || isNAN(page_impressions_viral[i]) ){
                            page_impressions_viral =0;
                          }
                          var end_time = response.data[0].values[i]["end_time"];
                          var timedate = new Date (end_time);
                          var xtime = timedate.getTime();
                          page_impressions_viral_time[i] = xtime;
                          if (page_impressions_viral_time[i] == null) {
                            page_impressions_viral_time = 0;
                          }
                        }      
                    }); 
                    
                    if (true){
                          FB.api('/'+page_id+'/insights/page_impressions/week?access_token='+access_token,function (response) {

                              page_impressions_week[0]=response.data[0].values[0].value;
                              page_impressions_week[1]=response.data[0].values[1].value;
                              page_impressions_week[2]=response.data[0].values[2].value;

                              for (var i=0; i<page_impressions_week.length; i++){
                                if (page_impressions_week[i]== null || isNAN(page_impressions_week[i]) ){
                                  page_impressions_week =0;
                                }
                                var end_time = response.data[0].values[i]["end_time"];
                                var timedate = new Date (end_time);
                                var xtime = timedate.getTime();
                                page_impressions_week_time[i] = xtime;
                                if (page_impressions_week_time[i] == null) {
                                  page_impressions_week_time = 0;
                                }
                              }  
                              $scope.toolTipContentFunction = function(){
                                return function(key, x, y, e, graph) {
                                  console.log('tooltip content');
                                    return  'Super New Tooltip' +
                                        '<h1>' + key + '</h1>' +
                                        '<p>' +  y + ' at ' + x + '</p>';
                                    };
                              };
                              $scope.xrFunction = function(){
                                return function(d){
                                  return d.key;
                                };
                              };
                              var totalvalues = [];
                              var organicvalues = [];
                              var paidvalues = [];
                              var viralvalues = [];

                              for (var j=0; j<page_impressions_week.length; j++){
                                totalvalues[j] = [page_impressions_week_time[j], page_impressions_week[j]];
                              }
                              for (j=0; j<page_impressions_organic.length; j++){
                                organicvalues[j] = [page_impressions_organic_time[j], page_impressions_organic[j]];
                              }
                              for (j=0; j<page_impressions_paid.length; j++){
                                paidvalues[j] = [page_impressions_paid_time[j], page_impressions_paid[j]];
                              }
                              for (j=0; j<page_impressions_viral.length; j++){
                                viralvalues[j] = [page_impressions_viral_time[j], page_impressions_viral[j]];
                              }
        
                                  $scope.reach.reachevolutiondata=[
                                    {
                                     // "key": "Total Reach",
                                     //  "values": totalvalues
                                    "key": "Total Reach",
                                    "values": [[page_impressions_week_time[0], page_impressions_week[0]], [page_impressions_week_time[1], page_impressions_week[1]], [page_impressions_week_time[2], page_impressions_week[2]]]                 
                                    }, 
                                    {
                                     // "key": "organic Reach",
                                     //  "values" : organicvalues
                                    "key": "Organic Reach",
                                    "values": [[page_impressions_organic_time[0], page_impressions_organic[0]], [page_impressions_organic_time[1], page_impressions_organic[1]], [page_impressions_organic_time[2], page_impressions_organic[2]]]                 
                                    },           
                                    {
                                     // "key": "paid Reach",
                                     // "values": paidvalues
                                    "key": "Paid Reach",
                                    "values": [[page_impressions_paid_time[0], page_impressions_paid[0]], [page_impressions_paid_time[1], page_impressions_paid[1]], [page_impressions_paid_time[2], page_impressions_paid[2]]]                                  
                                    },
                                    {
                                     // "key": "viral Reach",
                                     // "values": viralvalues
                                    "key": "Viral Reach",
                                    "values": [[page_impressions_viral_time[0], page_impressions_viral[0]], [page_impressions_viral_time[1], page_impressions_viral[1]], [page_impressions_viral_time[2], page_impressions_viral[2]]]                                  
                                    }                                
                                  ];

                 
                              $scope.reach.xAxisTickFormatFunction = function(){
                                return function(d){
                                  return d3.time.format('%x')(new Date(d));
                                };
                              };
                              $scope.$apply();
                          });
                    }

              }
        }

    });
         

// SOURCES : LIKE SOURCES
          FB.api(
              '/'+page_id+'/insights/page_fans_by_like_source/day?access_token='+access_token,function (response) {
                var count=response.data[0].values[0].value;
                  page_fans_by_like_source[0]={"name":"suggest.", "value":count.page_suggestion}; 
                  page_fans_by_like_source[1]={"name":"page", "value":count.page_profile}; 
                  page_fans_by_like_source[2]={"name":"ads", "value":count.ads}; 
                  page_fans_by_like_source[3]={"name":"mobile", "value":count.mobile}; 
                  page_fans_by_like_source[4]={"name":"profile", "value":count.profile_connect}; 
                  page_fans_by_like_source[5]={"name":"extern.", "value":count.external_connect}; 
                  page_fans_by_like_source[6]={"name":"recommend.", "value":count.recommended_pages}; 
                  page_fans_by_like_source[7]={"name":"timeline", "value":count.timeline}; 

                  var likesourcesvalues = [];

                  for (var i=0; i<page_fans_by_like_source.length; i++){
                    likesourcesvalues[i] = [page_fans_by_like_source[i].name, page_fans_by_like_source[i].value];
                    // likesourcesvalues[i] = [page_fans_by_like_source[i].name, i];

                  }

                  $scope.sources.likesources=[
                    {
                         "key": "Like Sources",
                         "values": likesourcesvalues
                    }                             
                  ];
                  $scope.$apply();
          });  

// SOURCES : VIEW SOURCES
          FB.api(
              '/'+page_id+'/insights/page_views_logout/day?access_token='+access_token,function (response) {
                  $scope.sources.page_views_logout=response.data[0].values[0].value;
                  $scope.$apply();
          });
          FB.api(
              '/'+page_id+'/insights/page_views_login/day?access_token='+access_token,function (response) {
                  $scope.sources.page_views_login=response.data[0].values[0].value;
                  $scope.$apply();
          });            
          FB.api(
              '/'+page_id+'/insights/page_views_unique/day?access_token='+access_token,function (response) {
                  $scope.sources.page_views_unique=response.data[0].values[0].value;
                  $scope.$apply();
          }); 
          
          var viewsourcesvalues = [];
          // viewsourcesvalues[0] = ["Logged out users",50];
          // viewsourcesvalues[1] = ["Logged in users",26];
          // viewsourcesvalues[2] = ["Unique Users",80];
          viewsourcesvalues[0] = ["Logged out users",$scope.sources.page_views_logout];
          viewsourcesvalues[1] = ["Logged in users",$scope.sources.page_views_login];
          viewsourcesvalues[2] = ["Unique Users",$scope.sources.page_fans_by_like_logout];
                  $scope.sources.viewsources=[
                    {
                         "key": "Like Sources",
                         "values": viewsourcesvalues
                    }                             
                  ];
                  $scope.$apply();
// REFERRALS
FB.api(
          '/'+page_id+'/insights/page_views_internal_referrals?access_token='+access_token,function (response) {
          var internal = [];
          for (var j in response.data[0].values){
            var count=response.data[0].values[j];
              // internal[j]="internal referrer";            
              internal[j]=count.value;   
          }
          $scope.referrals.internaldata=internal;
          $scope.$apply();
      });
      FB.api(
          '/'+page_id+'/insights/page_views_external_referrals?access_token='+access_token,function (response) {
          var external = [];
          for (var j in response.data[0].values){
            var count=response.data[0].values[j];   
              // external[j]="external referrer"; 
              external[j]=count.value;
          }
          $scope.referrals.externaldata=external;
          $scope.$apply();
      }); 


// STORIES' COSUMPTION : POSITIVE FEEDBACK
          FB.api(
            '/'+page_id+'/insights/page_positive_feedback_by_type/week?access_token='+access_token,function (response) {
                  var count=response.data[0].values[0].value;
                    page_positive_feedback_by_type[0]={"name":"rsvp", "value":count.rsvp}; 
                    page_positive_feedback_by_type[1]={"name":"link", "value":count.link}; 
                    page_positive_feedback_by_type[2]={"name":"comment", "value":count.comment}; 
                    page_positive_feedback_by_type[3]={"name":"claim", "value":count.claim}; 
                    page_positive_feedback_by_type[4]={"name":"answer", "value":count.answer}; 

                    var positivefeedbackvalues = [];

                    for (var i=0; i<page_positive_feedback_by_type.length; i++){
                      positivefeedbackvalues[i] = [page_positive_feedback_by_type[i].name, page_positive_feedback_by_type[i].value];
                      // positivefeedbackvalues[i] = [page_positive_feedback_by_type[i].name, i];
                    }
                  $scope.stories.positivefeedbackdata=[
                    {
                         "key": "positivefeedbackdata",
                         "values": positivefeedbackvalues
                    }                             
                  ];
            $scope.$apply(); 
          });  

// STORIES' COSUMPTION : TALKING ABOUT
          FB.api(  
              '/'+page_id+'/insights/page_story_adds_by_story_type/week?access_token='+access_token,function (response) {

                    var count=response.data[0].values[0].value;
                      page_story_adds_by_story_type[0]={"name":"mention", "value":count.mention}; 
                      page_story_adds_by_story_type[1]={"name":"question", "value":count.question}; 
                      page_story_adds_by_story_type[2]={"name":"fan", "value":count.fan}; 
                      page_story_adds_by_story_type[3]={"name":"U post", "value":count.user_post}; 
                      page_story_adds_by_story_type[4]={"name":"P post", "value":count.page_post}; 
                      page_story_adds_by_story_type[5]={"name":"Other.", "value":count.other}; 

                      var talkingaboutvalues = [];

                      for (var i=0; i<page_story_adds_by_story_type.length; i++){
                        talkingaboutvalues[i] = [page_story_adds_by_story_type[i].name, page_story_adds_by_story_type[i].value];
                        // talkingaboutvalues[i] = [page_story_adds_by_story_type[i].name, i];

                      }

                      $scope.stories.talkingaboutdata=[
                        {
                             "key": "Like Sources",
                             "values": talkingaboutvalues
                        }                             
                      ];
                      $scope.$apply();
          });

// STORIES' COSUMPTION :  INTERACTION
      FB.api(
          '/'+page_id+'/insights/page_storytellers/week?access_token='+access_token,function (response) {
          for (var j in response.data[0].values){
              var count=response.data[0].values[j];
              page_storytellers[j]=count.value;
              for (var i=0; i<page_storytellers; i++){
                if (page_storytellers==null || isNAN(page_storytellers) ){
                  page_storytellers = 0;
                }
              }
              var end_time = response.data[0].values[j]["end_time"];
              var timedate = new Date (end_time);
              var xtime = timedate.getTime();
              page_storytellers_time[j] = xtime;
          }
          var interactionvalues = [];
          for (var i=0; i<page_storytellers.length; i++){
            interactionvalues[i] = [page_storytellers_time[i], page_storytellers[i]];
          }

          $scope.stories.interactiondata =[
                   {
                   "key": "people interaction",
                   "values": interactionvalues
                    }                                                
                ]; 
          }); 
          $scope.stories.xAxisTickFormatFunction = function(){
                    return function(d){
                    return d3.time.format('%x')(new Date(d));
                   };
          };
          $scope.$apply();
          });  
      };  
    
  });
