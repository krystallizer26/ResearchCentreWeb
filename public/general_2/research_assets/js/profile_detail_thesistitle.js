app.controller('profileDetailThesistitleCtrl', function($scope, $http,global_service) {
  console.log("profileDetailThesistitleCtrl start");
  
  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);
  let dataObj = {
    researcherId : researcher_id,
    limit : 0
  };

  $http.post('/api/getAllThesisPreviewByResearcherId/',dataObj)
  .success(function(data, status, headers, config) {
      //$scope.message = data;
      console.log("-----------"+ JSON.stringify(data));
      if(data.code != "999999")
      {
        alert("getAllThesisPreviewByResearcherId "+data.message);
      }
      else
      {
      console.log("getAllThesisPreviewByResearcherId");
      $scope.thesis = data.data;
      $scope.thesis.forEach(function(item){
        item.studentName =  item.studentName.replace('รศ.', "").replace('ดร.', "").replace('อ.', "").replace('ผศ.', "").replace('ศ.', "")


      })

    

      console.log($scope.thesis)
    }
  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status+headers);
  });

});
