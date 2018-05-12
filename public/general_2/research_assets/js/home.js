

  app.controller('homeCtrl', function($scope, $http,$state,$window,global_service) {
    console.log("homeCtrl start");
    //$window.scrollTo(0, 0); //up to top
    //$state.go('profileDetail.general');
    //console.log("paperDetail paperDetail");

     // external js: flickity.pkgd.js
  $( document ).ready(function() {
    console.log( "ready!" );
  var $carousel = $('.carousel').flickity();
  var $background = $('.parallax__layer--bg');
  var $foreground = $('.parallax__layer--fg');
  
  var cellRatio = 0.6; // outerWidth of cell / width of carousel
  var bgRatio = 0.8; // width of background layer / width of carousel
  var fgRatio = 1.25; // width of foreground layer / width of carousel
  
  var flkty = $carousel.data('flickity');
  var count = flkty.slides.length - 1;
  
  $carousel.on( 'scroll.flickity', function( event, progress ) {
    moveParallaxLayer( $background, bgRatio, progress );
    moveParallaxLayer( $foreground, fgRatio, progress );
  });
  // trigger initial scroll
  $carousel.flickity('reposition');
  
  function moveParallaxLayer( $layer, layerRatio, progress ) {
    var ratio = cellRatio * layerRatio;
    $layer.css({
      left: ( 0.5 - ( 0.5 + progress * count ) * ratio ) * 100 + '%'
    });
  }
  
  });
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
                   console.log("this getAllResearcherPreview_ai = " +JSON.stringify(data))
                   if(data.code != "999999")
                   {
                           alert( JSON.stringify(data.code) )
                   }
                   else{
   
                       
                       $scope.researcher_list = data.data;
                       $scope.loading = false;
                   }
                   
                 
                   
                
               });
               res.error(function(data, status, headers, config) {
                   alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
   
               });
    }

   
   });
   