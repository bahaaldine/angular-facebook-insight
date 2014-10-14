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