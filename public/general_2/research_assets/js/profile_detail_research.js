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
      let Publication  = data.data;

      $scope.pb_international = [];
      $scope.pb_national = [];
      $scope.pb_conference = [];
      $scope.pb_book = [];
      $scope.pb_other = [];


      Publication.forEach(function(item){
            if(item.publishType == "international")
            {
              $scope.pb_international.push(item);
            }
            else if(item.publishType == "national")
            {
              $scope.pb_national.push(item);
            }
            else if(item.publishType == "conference")
            {
              $scope.pb_conference.push(item);
            }
            else if(item.publishType == "book")
            {
              $scope.pb_book.push(item);
            }
            else{
              $scope.pb_other.push(item);
            }
      })
      console.log("Publication");
      console.log(Publication);
    }
  })
  .error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      console.log(status+headers);
  });
});
