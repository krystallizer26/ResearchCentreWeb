app.controller('profileDetailGeneralCtrl', function($scope, $http,global_service) {
  console.log("profileDetailGeneralCtrl start");
  var researcher_id = global_service.get_research_id(researcher_id);
  console.log(researcher_id);
  //alert("id ===> " +researcher_id);

  //$scope.researchData = {}
  let dataObjGetResearcherfromID = {
            researcherId : researcher_id
          };

          //console.log("==== data getResearcherfromID ==== "+JSON.stringify(dataObjGetResearcherfromID));
          $http.post('/api/getResearcherfromID/',dataObjGetResearcherfromID)
            .success(function(data, status, headers, config) {
                //$scope.message = data;
                //console.log("-----------"+ JSON.stringify(data));
                if(data.code != "999999")
                {
                  alert("getResearcherfromID "+data.message);
                }
                else
                {
                //console.log(data);
                $scope.researchData  = data.data;
                //console.log($scope.researchData)
            //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
              }
            })
            .error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });


            let dataObj = {
              researcherId : researcher_id,
              limit : 3
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
            
            $http.post('/api/getAllIntellectualPropertyPreviewByResearcherId/',dataObj)
            .success(function(data, status, headers, config) {
                //$scope.message = data;
                console.log("-----------"+ JSON.stringify(data));
                if(data.code != "999999")
                {
                  alert("getAllIntellectualPropertyPreviewByResearcherId "+data.message);
                }
                else
                {
                console.log("intellectualProperty");
                $scope.intellectualProperty  = data.data;
                console.log($scope.intellectualProperty)
            //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
              }
            })
            .error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });


            $http.post('/api/getAllResearchFundPreviewByResearcherId/',dataObj)
            .success(function(data, status, headers, config) {
                //$scope.message = data;
                console.log("-----------"+ JSON.stringify(data));
                if(data.code != "999999")
                {
                  alert("getAllResearchFundPreviewByResearcherId "+data.message);
                }
                else
                {
                console.log("fund");
                $scope.funds  = data.data;
                console.log($scope.funds)
              }
            })
            .error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                console.log(status+headers);
            });


});
