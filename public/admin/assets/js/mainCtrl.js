angular.module('app', ['ui.router',"api_service", 'ngSanitize',"ngTable"])


angular.module('app').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/admin_researcher');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('admin_researcher', {
                url: '/admin_researcher',
                templateUrl : "./partial/admin_researcher.html"
            })

    



});


angular.module('app')

    // super simple service
    // each function returns a promise object
    .factory('global_service', ['$rootScope', '$http', function ($rootScope, $http){
        var buf_id ;
    return {
        get_news_id : function () {
            return buf_id;
        },
        set_news_id : function (id) {
            buf_id = id;
            alert(buf_id)
        }
    }


    }]);

angular.module('app').controller('admin_researcher', function ($scope,$http,api_manage,NgTableParams){
  // alert("global ctrl");

  $scope.init=function(){
    $scope.loading=true;
    $scope.get_all_researcher();

}


$scope.pop_modal = function(researcher_id){
    $scope.loading=true;
    
  let dataObj = {

    researcherId  :researcher_id
                };
  console.log("for getResearcherfromID =====----dataObj ---+++++" + JSON.stringify(dataObj));
  let res = $http.post('/api/getResearcherfromID', dataObj);


  res.success(function(data, status, headers, config) {
      //$scope.message = data;
      console.log("this getResearcherfromID = ")
      console.log(data.data)
      if(data.code != "999999")
      {
              alert( JSON.stringify(data) )
      }
      else{

          
        $scope.modal_view_researcher_id = data.data;
        $scope.loading = false;
      }
      
    
      
   
  });
  res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"getResearcherfromID ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

  });
}



  $scope.get_all_researcher = function(){
  let dataObj = {
    
                };
  console.log("for getAllResearcherPreview =====----dataObj ---+++++" + JSON.stringify(dataObj));
  let res = $http.post('/api/getAllResearcherPreview', dataObj);


  res.success(function(data, status, headers, config) {
      //$scope.message = data;
      console.log("this getAllResearcherPreview_ai = ")
      console.log(data.data)
      if(data.code != "999999")
      {
              alert( JSON.stringify(data.code) )
      }
      else{

          
        $scope.researcher_list = data.data;
          $scope.table_researcher_list = new NgTableParams({count: 10 /*,  sorting: { stamp: "desc" }*/ }, { counts: [50, 200, 500], dataset: $scope.researcher_list});
          
          $scope.loading = false;
      }
      
    
      
   
  });
  res.error(function(data, status, headers, config) {
      alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

  });


}

});
