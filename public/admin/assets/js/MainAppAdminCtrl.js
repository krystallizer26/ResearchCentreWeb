'use strict';

var app = angular.module('app', [] );

// app.config(function($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise('/about');
//
//       $stateProvider
//
//       .state('about', {
//         url: '/about',
//         templateUrl: "http://localhost:2001/department_template/about.html",
//         controller: 'aboutCtrl'
//       })
//       .state('enroll', {
//         url: '/enroll',
//         templateUrl: "http://localhost:2001/department_template/enroll.html",
//         controller: 'enrollCtrl'
//       })
// });

app.controller("mainCtrl", function($scope,$http) {
  //write code

  // let getAllPosition = $http.post('/api/getAllPosition/');
  // getAllPosition.success(function(data, status, headers, config) {
  //     if(data.code !== "999999"){
  //       alert(data.message)
  //     }else{
  //       $scope.positionList = data.message;
  //       console.log("getAllPosition >>>>>>>>>>>>>");
  //       console.log($scope.positionList);
  //     }
  // });
  // getAllPosition.error(function(data, status, headers, config) {
  //     alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
  //     console.log(status+headers);
  // });
  
        $http({
            method: 'POST',
            url: '/api/getAllDepartment/'
        }).then(function (response) {
            console.log(response, 'res');
            var data = response.data;
            console.log(data);
            if(data.code !== "999999"){
                 alert(data.message)
               }else{
                 $scope.depList =  data.data;
                 console.log("depList >>>>>>>>>>>>>");
                 console.log($scope.depList);
               }
        },function (error){
            console.log(error, 'can not get data. can not content');
        });

        $http({
            method: 'POST',
            url: '/api/getAllPosition/'
        }).then(function (response) {
            console.log(response, 'res');
            var data = response.data;
            console.log(data);
            if(data.code !== "999999"){
                 alert(data.message)
               }else{
                 $scope.positionList =  data.data;
                 console.log("getAllPosition >>>>>>>>>>>>>");
                 console.log($scope.positionList);
               }
        },function (error){
            console.log(error, 'can not get data. can not content');
        });

        $http({
            method: 'POST',
            url: '/api/getAllAcademicLevel/'
        }).then(function (response) {
            console.log(response, 'res');
            var data = response.data;
            console.log(data);
            if(data.code !== "999999"){
                 alert(data.message)
               }else{
                 $scope.academicList =  data.data;
                 console.log("Academic >>>>>>>>>>>>>");
                 console.log($scope.academicList);
               }
        },function (error){
            console.log(error, 'can not get data. can not content');
        });




  $scope.newResearcher = {
        researcherFName_TH : "",
        researcherLName_TH : "",
        researcherFName_EN : "",
        researcherLName_EN : "",
        gender : "",
        personalID : "",
        birthDate : "",
        departmentId : "5adf3a36ad98c309f8f9bfb7",
        positionId : "5adf3addad98c309f8f9bfc0",
        academicLevelId : "5adf3b17ad98c309f8f9bfc4",
        bachelorGraduation : "",
        masterGraduation : "",
        doctoralGraduation : "",
        target : "10-10-2010",
        assignDate : "",
        retirementStatus : "",
        researcherPic : "",
        retirementStatus : false,
  }

  $scope.createNewResearcher = function () {
    console.log("newResearcher >>>>> ");
    console.log($scope.newResearcher);
    $http({
        method: 'POST',
        url: '/api/newResearcher/',
        params: $scope.newResearcher
    }).then(function (response) {
        console.log(response, 'res');
        var data = response.data;
        console.log(data);
        if(data.code !== "999999"){
             alert(data.message)
           }else{
             console.log(" createNewResearcher complete");
           }
    },function (error){
        console.log(error, 'can not get data. can not content !!');
    });
  }

});




//================================================================================
app.service("uploadService", function($http, $q) {

    return ({
        upload: upload
    });

    function upload(file) {
        var upl = $http({
            method: 'POST',
            // url: 'http://jsonplaceholder.typicode.com/posts', // /api/upload
            url: 'https://ghb-npl2560.herokuapp.com/api/Q_manage',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                upload: file
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        });
        return upl.then(handleSuccess, handleError);

    } // End upload function

    // ---
    // PRIVATE METHODS.
    // ---

    function handleError(response, data) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }

        return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
        return (response);
    }

})
app.directive("fileinput", [function() {
    return {
        scope: {
            fileinput: "=",
            filepreview: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.fileinput = changeEvent.target.files[0];
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.filepreview = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(scope.fileinput);
            });
        }
    }
}]);
//================================================================================
