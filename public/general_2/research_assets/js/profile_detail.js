app.controller('profileDetailCtrl', function($scope, $http , $state) {
  console.log("profileDetailCtrl start");
  $scope.gotoHome = function () {
    $('li.active').removeClass('active');
    $('#tab1').addClass('active');
    $state.go("profileDetail.general");
  }
  $scope.gotoResearch = function () {
    $('li.active').removeClass('active');
    $('#tab2').addClass('active');
    $state.go("profileDetail.research");
  }
  $scope.gotoIntellectualProperty = function () {
    $('li.active').removeClass('active');
    $('#tab3').addClass('active');
    $state.go("profileDetail.copyright");
  }
  $scope.gotoResearchGrants = function () {
    $('li.active').removeClass('active');
    $('#tab4').addClass('active');
    $state.go("profileDetail.researchGrants");
  }
  $scope.gotoAward = function () {
    $('li.active').removeClass('active');
    $('#tab5').addClass('active');
    $state.go("profileDetail.award");
  }
  $scope.gotoThesisTopics = function () {
    $('li.active').removeClass('active');
    $('#tab6').addClass('active');
    $state.go("profileDetail.thesistitle");
  }

  $scope.gotoTraining = function () {
    $('li.active').removeClass('active');
    $('#tab7').addClass('active');
    $state.go("profileDetail.training");
  }

});
