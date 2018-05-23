app.controller('profileDetailAwardCtrl', function($scope, $http, global_service) {
  console.log("profileDetailAwardCtrl start");

  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);
  let dataObj = {
    researcherId : researcher_id,
    limit : 0
  };
  
  $http.post('/api/getAllRewardPreviewByResearcherId/',dataObj)
  .success(function(data, status, headers, config) {
      //$scope.message = data;
      console.log("-----------"+ JSON.stringify(data));
      if(data.code != "999999")
      {
        alert("getAllRewardPreviewByResearcherId "+data.message);
      }
      else
      {
      console.log("Awards");
      $scope.awards = data.data;
      console.log($scope.award)
    }
  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status+headers);
  });
});
