app.controller('homeCtrl', function($scope, $http,$state,$window,global_service) {
 console.log("homeCtrl start");
 //$window.scrollTo(0, 0); //up to top
 //$state.go('profileDetail.general');
 //console.log("paperDetail paperDetail");
init();


 function init(){
	 $scope.search={};
	 $scope.search.departmentName_TH='';
<<<<<<< HEAD
     
     $scope.loading = true;
=======

>>>>>>> f6c10f46344079773b945c78b7bdcb8a6f41cdb8
	 $scope.researcher_list={};
	  let dataObj = {

            };


        console.log("for getAllResearcherPreview =====----dataObj ---+++++" + JSON.stringify(dataObj));
            let res = $http.post('/api/getAllResearcherPreview', dataObj);


            res.success(function(data, status, headers, config) {
                //$scope.message = data;
<<<<<<< HEAD
                console.log("this getAllResearcherPreview_ai = " +JSON.stringify(data))
                if(data.code != "999999")
                {
                        alert( JSON.stringify(data.code) )
                }
                else{

                    
                    $scope.researcher_list = data.data;
                    $scope.loading = false;
                }
                
              
                
             
=======
                console.log("this getAllResearcherPreview = " +JSON.stringify(data))
                $scope.researcher_list = data.data;



>>>>>>> f6c10f46344079773b945c78b7bdcb8a6f41cdb8
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

            });
 }

 $scope.filter_department = function(department_name){

	 $scope.search.departmentName_TH = department_name;

 }

 $scope.reset_filter = function(){

	  $scope.search = {};
 }

 $scope.gotoProfile = function (researcher_id) {


	 global_service.set_research_id(researcher_id);
	 // alert()

   $state.go('profileDetail.general');


 }



});
