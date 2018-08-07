app.controller('trainingCtrl', function($scope, $http,global_service) {
  console.log("trainingCtrl start");
  
  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);
  let dataObj = {
    researcherId : researcher_id,
    limit : 0
  };

  $http.post('/api/getAllResearcherTrainingPreviewByResearcherId/',dataObj)
  .success(function(data, status, headers, config) {
      //$scope.message = data;
      //console.log("-----------"+ JSON.stringify(data));
      if(data.code != "999999")
      {
        //alert("getAllResearcherTrainingPreviewByResearcherId "+data.message);
      }
      else
      {
      //console.log("getAllResearcherTrainingPreviewByResearcherId");
      $scope.trainingList = data.data;

      console.log($scope.trainingList)
      //console.log($scope.thesis)
        
     
    }
  })
  .error(function(data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
  });
  

});
