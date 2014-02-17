'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles','mean.events','mean.socket']);

angular.module('mean.system', []);
angular.module('mean.socket', []);
angular.module('mean.articles', []);

angular.module('mean.events', []);
