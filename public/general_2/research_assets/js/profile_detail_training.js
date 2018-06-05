app.controller('trainingCtrl', function($scope, $http,global_service) {
  console.log("trainingCtrl start");
  
  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);
  let dataObj = {
    researcherId : researcher_id,
    limit : 0
  };

  

});
