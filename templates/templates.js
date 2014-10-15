angular.module('templates/fb-insight-dailyLine.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-dailyLine.html',
    "<div class=\"fb-insight\" ng-class=\"api\" ng-if=\"data\">\n" +
    "\t<h1>{{title}}</h1>\n" +
    "\t<h4>{{description}}</h4>\n" +
    "  <chart value=\"data\"></chart>\n" +
    "  <button>previous</button>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-feedbackBreakdown.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-feedbackBreakdown.html',
    "<div class=\"fb-insight\" ng-class=\"api\" ng-if=\"data\">\n" +
    "\t<h1>{{title}}</h1>\n" +
    "  <h4>{{description}}</h4>\n" +
    "   <ng-font-chart \n" +
    "      font=\"fa fa-female\"\n" +
    "      value=\"data.female\"\n" +
    "      start-color=\"#3b5998\"\n" +
    "      end-color=\"rgba(255,255,255, 0.8)\">\n" +
    "    </ng-font-chart>\n" +
    "    <chart type=\"Bar\" value=\"data.data\"></chart>\n" +
    "\n" +
    "    <ng-font-chart \n" +
    "      font=\"fa fa-male\"\n" +
    "      value=\"data.male\"\n" +
    "      start-color=\"#3b5998\"\n" +
    "      end-color=\"rgba(255,255,255, 0.8)\">\n" +
    "    </ng-font-chart>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-genderBreakdown.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-genderBreakdown.html',
    "<div class=\"fb-insight\" ng-class=\"api\" ng-if=\"data\">\n" +
    "\t<h1>{{title}}</h1>\n" +
    "  <h4>{{description}}</h4>\n" +
    "   <ng-font-chart \n" +
    "      font=\"fa fa-female\"\n" +
    "      value=\"data.female\"\n" +
    "      start-color=\"#3b5998\"\n" +
    "      end-color=\"rgba(255,255,255, 0.8)\">\n" +
    "    </ng-font-chart>\n" +
    "    <chart type=\"Bar\" value=\"data.data\"></chart>\n" +
    "\n" +
    "    <ng-font-chart \n" +
    "      font=\"fa fa-male\"\n" +
    "      value=\"data.male\"\n" +
    "      start-color=\"#3b5998\"\n" +
    "      end-color=\"rgba(255,255,255, 0.8)\">\n" +
    "    </ng-font-chart>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-geomap.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-geomap.html',
    "<div class=\"fb-insight\" ng-class=\"api\" ng-if=\"data\">\n" +
    "  <h1>{{title}}</h1>\n" +
    "  <h4>{{description}}</h4>\n" +
    "  <geomap data=\"data\"></geomap>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-hourlyLine.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-hourlyLine.html',
    "<div class=\"fb-insight\" ng-class=\"api\" ng-if=\"data\">\n" +
    "  <h1>{{title}}</h1>\n" +
    "  <h4>{{description}}</h4>\n" +
    "  <chart value=\"data\"></chart>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-map.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-map.html',
    "<div class=\"fb-insight\" ng-class=\"api\" ng-if=\"data\">\n" +
    "  <h1>{{title}}</h1>\n" +
    "  <h4>{{description}}</h4>\n" +
    "  <map class=\"map\" data=\"data\"></map>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-text.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-text.html',
    "<div class=\"fb-insight\" ng-class=\"api\">\n" +
    "  <h1>{{title}}</h1>\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.logo\"></div>\n" +
    "    <div class=\"fb-insight-image\"><img src=\"https://graph.facebook.com/{{data.id}}/picture\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.cover\"></div>\n" +
    "    <div class=\"fb-insight-image\"><img src=\"{{data.cover.source}}\"></img></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.name\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.name}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.about\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.about}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.category\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.category}}</div>\n" +
    "      <div class=\"fb-insight-info\" ng-repeat=\"category in overview.category_list\">\n" +
    "        <div class=\"fb-insight-value\">{{data.name}}</div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.published\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.is_published}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.likes.count\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.likes}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.link\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.link}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.link\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.link}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.promotion\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.promotion_eligible}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.likes.new\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.new_like_count}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.talking\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.talking_about_count}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.message.unread\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.unread_message_count}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.message.unseen\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.unseen_message_count}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"fb-insight-info\">\n" +
    "    <div class=\"fb-insight-label\" lng=\"text:label.notification.unread\"></div>\n" +
    "    <div class=\"fb-insight-value\">{{data.unread_notif_count}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );

}]);
