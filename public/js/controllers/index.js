'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;

}]);

angular.module('mean.events').controller('EventsController', ['$scope', '$modal', '$routeParams', '$location', '$timeout' , '$http','Global', 'Events', 'Socket',function ($scope, $modal, $routeParams, $location, $timeout , $http, Global, Events, Socket) {
  $scope.events = Events.query();
  $scope.show = true;

  $scope.like = function() {
      var event = this.event;
       event.$update({
      
      	},function( _event ){

	      	event.likes = _event.likes;    	
	    
      },function(a){

	    	$scope.openmodal();
	    
      });
  };

  $scope.openmodal = function () {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {

    });
  };

  Socket.on('event:updated', function (data) {
   var newevent = data.event;
   angular.forEach($scope.events, function(event){
      if(event._id == newevent._id){
        console.log('entra');
        event.likes = newevent.likes;
        event.user  = data.user;

        $http({method: 'GET', url: 'http://graph.facebook.com/'+data.user.facebook.id+'/?fields=picture'}).
            success(function(data, status, headers, config) {
             event.user_image_url = data.picture.data.url;
             console.log(event);
             event.notifupdated   = true;
             $timeout(function(){
               event.notifupdated = false;
             },2000);
            }).
            error(function(data, status, headers, config) {
             console.log(data);
            });
      }
   });


    // Events.get({
    //     eventId: event._id
    // }, function(event) {
    //     console.log(event);
    //     $scope.event = event;
    // });
  });

 

  $scope.items = ['item1', 'item2', 'item3'];

  var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };



}]);

