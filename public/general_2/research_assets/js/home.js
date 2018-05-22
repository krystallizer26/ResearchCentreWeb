

  app.controller('homeCtrl', function($scope, $http,$state,$window,global_service) {
    console.log("homeCtrl start");
    //$window.scrollTo(0, 0); //up to top
    //$state.go('profileDetail.general');
    //console.log("paperDetail paperDetail");

     // external js: flickity.pkgd.js
     // external js: flickity.pkgd.js



init();


 function init(){
     $scope.search={};
     $scope.search.departmentData = {};
	 $scope.search.departmentData.departmentName_TH='';
     
     $scope.loading = true;
	 $scope.researcher_list={};
	  let dataObj = {

            };


        console.log("for getAllResearcherPreview =====----dataObj ---+++++" + JSON.stringify(dataObj));
            let res = $http.post('/api/getAllResearcherPreview', dataObj);


            res.success(function(data, status, headers, config) {
                //$scope.message = data;
                console.log("this getAllResearcherPreview_ai = ")
                console.log(JSON.stringify(data))
                if(data.code != "999999")
                {
                        alert( JSON.stringify(data.code) )
                }
                else{

                    
                    $scope.researcher_list = data.data;
                    $scope.loading = false;

                }
                    /*
                    var $carousel = $('.carousel').flickity({
  draggable: false,
});

// hack staticClick
var flkty = $carousel.data('flickity');
flkty.element.addEventListener( 'click', function( event ) {
  flkty.staticClick( event, event );
});

$carousel.on( 'staticClick.flickity', function( event, pointer, cellElem, cellIndex ) {
  var message = 'staticClick';
  if ( cellElem ) {
    message += ' on cell ' + (cellIndex+1);
  }
  console.log( message )
});
                }
                
              */
                
             
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

            });
 }


   
   });
   