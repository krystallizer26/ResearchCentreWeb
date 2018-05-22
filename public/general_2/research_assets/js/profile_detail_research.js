app.controller('profileDetailResearchCtrl', function($scope, $http,global_service) {
  console.log("profileDetailResearchCtrl start");
  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);

  let dataObj = {
    researcherId : researcher_id,
    limit : 0
  };

  $http.post('/api/getAllPublicationPreviewByResearcherId/',dataObj)
  .success(function(data, status, headers, config) {
      //console.log("-----------"+ JSON.stringify(data));
      if(data.code != "999999")
      {
        alert("getAllPublicationPreviewByResearcherId 999999"+data.message);
      }
      else
      {
      $scope.Publication  = data.data;
      console.log("Publication");
      console.log($scope.Publication);
    }
  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status+headers);
  });
});
