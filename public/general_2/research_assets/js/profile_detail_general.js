app.controller('profileDetailGeneralCtrl', function($scope, $http,global_service) {
  console.log("profileDetailGeneralCtrl start");
  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);
  //alert("id ===> " +researcher_id);

  //$scope.researchData = {}
  let dataObj = {
            researcherId : researcher_id
          };

          console.log("==== data getResearcherfromID ==== "+JSON.stringify(dataObj));
          $http.post('/api/getResearcherfromID/',dataObj)
            .success(function(data, status, headers, config) {
                //$scope.message = data;
                console.log("-----------"+ JSON.stringify(data));
                if(data.code != "999999")
                {
                  alert("getResearcherfromID "+data.message);
                }
                else
                {
                console.log(data);
                $scope.researchData  = data.data;
                console.log($scope.researchData)
            //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });

              }

            })
            .error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });


});
