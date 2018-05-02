app.controller('homeCtrl', function($scope, $http,$state,$window) {
 console.log("homeCtrl start");
 //$window.scrollTo(0, 0); //up to top
 $state.go('profileDetail.general');
 //console.log("paperDetail paperDetail");
});
