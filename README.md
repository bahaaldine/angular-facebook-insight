[![Build Status](https://travis-ci.org/bahaaldine/angular-facebook-insight.svg?branch=master)](https://travis-ci.org/bahaaldine/angular-facebook-insight)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# Angular Facebook Insight

The angular component which lets you requests your Facebook page
insight and creates a fancy dashboard !

## Installation

Install the module using [bower]: http://bower.io

```shell
	bower install angular-facebook-insight
```

Add js libraries to your application:
```html
	...
	<script src="bower_components/angular-facebook-insight/dist/angular-facebook-insight.js"></script>
    ...
```

Add css stylesheets to your application:
```html
    <link rel="stylesheet" href="bower_components/angular-facebook-insight/dist/css/angular-facebook-insight.css"/>
```

Add ngFacebookInsight module to you application
```javascript
	...
	angular
	  .module('myAwesomeApp', [
	    ...
	    'ngFacebookInsight',
	    ...
	  ])
	...
```

## Usage

All you need is to place a ngFacebookInsight with its attribute in your view like the following piece of code:
```javascript
	...
		<facebook-insight 
            overview="overview"
            todaystats="todaystats" 
            reach="reach"
            sources="sources"
            referrals="referrals"
            stories="stories" 
            geographics="geographics"
            fans="fans"
            negativefeed="negativefeed"
            roi="roi"></facebook-insight>
	...
```

TODO: document each attribute


## Brower compatibility
