app.controller('profileDetailCtrl', function($scope, $http , $state) {
  console.log("profileDetailCtrl start");
  $scope.gotoHome = function () {
    $state.go("profileDetail.general");
  }
  $scope.gotoResearch = function () {
    $state.go("profileDetail.research");
  }
  $scope.gotoIntellectualProperty = function () {
    $state.go("profileDetail.copyright");
  }
  $scope.gotoResearchGrants = function () {
    $state.go("profileDetail.researchGrants");
  }
  $scope.gotoAward = function () {
    $state.go("profileDetail.award");
  }
  $scope.gotoThesisTopics = function () {
    $state.go("profileDetail.thesistitle");
  }

});
