'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user
        };

        return _this._data;
    }
]);

angular.module('mean.events').factory('Events', ['$resource', function($resource) {
    return $resource('events/:eventId', {
        eventId: '@_id'
    }, {
      query: {
            method:'GET', isArray:true
        },
      save: {
            mehod:'POST'
        },
      update: {
            method: 'PUT'
        }
    });
}]);