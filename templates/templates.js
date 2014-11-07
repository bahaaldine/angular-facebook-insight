angular.module('templates/fb-insight-bar.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-bar.html',
    "<div>\n" +
    "  <highchart id=\"pie\" config=\"data\" class=\"pie\"></highchart>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-gauge.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-gauge.html',
    "<div>\n" +
    "  <highchart id=\"pie\" config=\"data\" class=\"pie\"></highchart>\n" +
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

angular.module('templates/fb-insight-pie.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-pie.html',
    "<div>\n" +
    "  <highchart id=\"pie\" config=\"data\" class=\"pie\"></highchart>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-reach.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-reach.html',
    "<div>\n" +
    "\t<div class=\"value\"><ng-odometer value=\"data\"></ng-odometer></div>\n" +
    "\t<div class=\"title\"><i class=\"fa fa-dot-circle-o\"></i><span lng=\"text:{{label}}\"></span></div>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-insight-spider.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-insight-spider.html',
    "<div>\n" +
    "  <highchart id=\"pie\" config=\"data\" class=\"pie\"></highchart>\n" +
    "</div>"
  );

}]);

angular.module('templates/fb-post-details.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/fb-post-details.html',
    "<div class=\"ng-fb-post-details\" ng-if=\"post\"><div>\n" +
    "\t<div class=\"post-header\"><div>\n" +
    "\t\t<div class=\"page-picture\"><img ng-src=\"http://graph.facebook.com/{{post.page}}/picture\"></div>\n" +
    "\t\t<div class=\"page-name\">{{post.company}}</div>\n" +
    "\t\t<div class=\"post-publish-date\">{{post.created}}</div>\n" +
    "\t</div></div>\n" +
    "\n" +
    "\t<div class=\"post-message\"><div>{{post.message}}</div></div>\n" +
    "\n" +
    "\t<div class=\"post-description\"><div>\n" +
    "\t\t<div class=\"post-picture\"><img ng-src=\"{{post.picture}}\"></img></div>\n" +
    "\t\t<div class=\"text\">\n" +
    "\t\t\t<div class=\"post-name\">{{post.name}}</div>\n" +
    "\t\t\t<div class=\"post-caption\">{{post.caption}}</div>\n" +
    "\t\t\t<div class=\"post-cta\"></div>\n" +
    "\t\t</div>\n" +
    "\t</div></div>\n" +
    "\t<div class=\"post-comments\">\n" +
    "\t\t<div class=\"comment\" ng-repeat=\"comment in post.comments.data\"><div>\n" +
    "\t\t\t<div class=\"picture\"><img ng-src=\"http://graph.facebook.com/{{comment.from.id}}/picture?type=square\"></img></div>\n" +
    "\t\t\t<div class=\"content\">\n" +
    "\t\t\t\t<div class=\"author\">{{comment.from.name}}</div>\n" +
    "\t\t\t\t<div class=\"message\">{{comment.message}}</div>\n" +
    "\t\t\t\t<div class=\"created\"><span am-time-ago=\"comment.created_time\"> <i class=\\\"fa fa-like\\\"></i>{{comment.likes}}</div></div>\n" +
    "\t\t\t\t<div class=\"actions\"></div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div></div>\n" +
    "\t</div>\n" +
    "</div></div>"
  );

}]);
