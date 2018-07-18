app.controller('profileDetailGeneralCtrl', function ($scope, $http, global_service, $state) {
  //console.log("profileDetailGeneralCtrl start");

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
  $scope.gotoTraing = function () {
    $('li.active').removeClass('active');
    $('#tab7').addClass('active');
    $state.go("profileDetail.training");
  }

  var researcher_id = global_service.get_research_id(researcher_id);
  //console.log(researcher_id);
  ////alert("id ===> " +researcher_id);

  //$scope.researchData = {}
  let dataObjGetResearcherfromID = {
    researcherId: researcher_id
  };


  ////console.log("==== data getResearcherfromID ==== "+JSON.stringify(dataObjGetResearcherfromID));
  $http.post('/api/getResearcherfromID/', dataObjGetResearcherfromID)
    .success(function (data, status, headers, config) {
      //$scope.message = data;
      ////console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getResearcherfromID "+data.message);
      }
      else {

        //console.log("-*-------------------------------");
        //console.log("getResearcherfromID ");
        //console.log(data);
        //console.log("getResearcherfromID Printed");

        $scope.researchData = data.data;
        ////console.log($scope.researchData)
        //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });


  let dataObjforpublicdataObj = {
    researcherId: researcher_id,
    limit: 0
  };

  let dataObj = {
    researcherId: researcher_id,
    limit: 3
  };

  $http.post('/api/getAllPublicationPreviewByResearcherId/', dataObjforpublicdataObj)
    .success(function (data, status, headers, config) {
      ////console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getAllPublicationPreviewByResearcherId 999999"+data.message);
      }
      else {
        //$scope.Publication = data.data;
        $scope.Publication = [];
        let buf_publication = data.data;
        buf_publication.forEach(function (item) {
          if (item.publishType == "InternationalJournal") {
            $scope.Publication.push(item);
          }
          else if (item.publishType == "NationalJournal") {

          }
          else if (item.publishType == "InternationalConference" | item.publishType == "NationalConference") {

          }
          else if (item.publishType == "Others") {

          }
          else {

          }
        })

        if ($scope.Publication.length < 3) {
          buf_publication.forEach(function (item) {
            if (item.publishType == "NationalJournal" ) {
              $scope.Publication.push(item);
            }
            else if (item.publishType == "InternationalConference" | item.publishType == "NationalConference" ) {
              
            }
            else if (item.publishType == "Others") {
             
            }
            else {

            }
          })
        }

        if ($scope.Publication.length < 3) {
          buf_publication.forEach(function (item) {
            if (item.publishType == "InternationalConference" | item.publishType == "NationalConference") {
              $scope.Publication.push(item);
            }
            else if (item.publishType == "Others" ) {
             
            }
            else {

            }
          })
        }

        if ($scope.Publication.length < 3) {
          buf_publication.forEach(function (item) {
            if (item.publishType == "Others") {
              $scope.Publication.push(item);
            }
            else {

            }
          })
        }


        //console.log("Publication");
        //console.log($scope.Publication);
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });

  $http.post('/api/getAllIntellectualPropertyPreviewByResearcherId/', dataObj)
    .success(function (data, status, headers, config) {
      //$scope.message = data;
      //console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getAllIntellectualPropertyPreviewByResearcherId "+data.message);
      }
      else {
        //console.log("intellectualProperty");
        $scope.intellectualProperty = data.data;
        //console.log($scope.intellectualProperty)
        //    $scope.news_table= new NgTableParams({count: 10 ,  sorting: { resourceName: "desc" }  }, { counts: [10,20, 100], dataset: $scope.news_list });
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });


  $http.post('/api/getAllResearchFundPreviewByResearcherId/', dataObj)
    .success(function (data, status, headers, config) {
      //$scope.message = data;
      //console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getAllResearchFundPreviewByResearcherId "+data.message);
      }
      else {
        //console.log("fund");
        $scope.funds = data.data;
        //console.log($scope.funds)
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });



  $http.post('/api/getAllRewardPreviewByResearcherId/', dataObj)
    .success(function (data, status, headers, config) {
      //$scope.message = data;
      //console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getAllRewardPreviewByResearcherId "+data.message);
      }
      else {
        //console.log("Awards");
        $scope.awards = data.data;
        //console.log($scope.award)
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });


  $http.post('/api/getAllThesisPreviewByResearcherId/', dataObj)
    .success(function (data, status, headers, config) {
      //$scope.message = data;
      //console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getAllThesisPreviewByResearcherId "+data.message);
      }
      else {
        console.log("getAllThesisPreviewByResearcherId");
        $scope.thesis = data.data;
        $scope.thesis.forEach(function (item) {
          item.studentName = item.studentName.replace('รศ.', "").replace('ดร.', "").replace('อ.', "").replace('ผศ.', "").replace('ศ.', "")


        })

        console.log($scope.thesis)
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });

  $http.post('/api/getAllResearcherTrainingPreviewByResearcherId/', dataObj)
    .success(function (data, status, headers, config) {
      //$scope.message = data;
      //console.log("-----------"+ JSON.stringify(data));
      if (data.code != "999999") {
        //alert("getAllResearcherTrainingPreviewByResearcherId "+data.message);
      }
      else {
        //console.log("getAllResearcherTrainingPreviewByResearcherId");
        $scope.trainingList = data.data;

        //console.log($scope.trainingList)
        //console.log($scope.thesis)
      }
    })
    .error(function (data, status, headers, config) {
      //alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
      //console.log(status+headers);
    });

});
