app.controller('researcherCtrl', function($scope, $http,$state,$window,global_service) {
 console.log("researcherCtrl start");
 //$window.scrollTo(0, 0); //up to top
 //$state.go('profileDetail.general');
 //console.log("paperDetail paperDetail");

 'use strict';

/*

Main javascript functions to init most of the elements

#1. RANGE SLIDER
#2. FEATURES SELECT
#3. STAR RATING
#4. DATE RANGE PICKER
#5. FILTER TOGGLER
#6. FILTERS PANEL MAIN TOGGLER

*/

$(function () {

  // #1. RANGE SLIDER
  if ($('.ion-range-slider').length) {
    $('.ion-range-slider').ionRangeSlider({
      type: "double",
      min: 0,
      max: 1000000,
      from: 200000,
      to: 800000,
      prefix: "$",
      step: 50000
    });
  }

  // #2. FEATURES SELECT


  if ($('.select2').length) {
    $('.select2').select2();
  }

  // #3. STAR RATING

  $('.item-star-rating').barrating({ theme: 'osadmin', readonly: true });
/*
  // #4. DATE RANGE PICKER
  var rental_start = moment();
  var rental_end = moment().add(14, 'days');
  $('.date-range-picker').daterangepicker({
    startDate: rental_start,
    endDate: rental_end,
    locale: {
      format: 'MMM D, YYYY'
    }

  });
*/

  // #5. FILTER TOGGLER

  $('.filter-toggle').on('click', function () {
    var $filter_w = $(this).closest('.filter-w');
    if ($filter_w.hasClass('collapsed')) {
      $filter_w.find('.filter-body').slideDown(300, function () {
        $filter_w.removeClass('collapsed');
      });
    } else {
      $filter_w.find('.filter-body').slideUp(300, function () {
        $filter_w.addClass('collapsed');
      });
    }
    return false;
  });

  // #6. FILTERS PANEL MAIN TOGGLER

  $('.filters-toggler').on('click', function () {
    $('.rentals-list-w').toggleClass('hide-filters');
    return false;
  });
});

init();


 function init(){
     $scope.search={};
     $scope.search.departmentData = {};
	 $scope.search.departmentData.departmentName_TH='';
     
     $scope.loading = true;
	 $scope.researcher_list=[];
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
                    $scope.loading = false;
                }
                
              
                
             
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");

            });
 }

 $scope.filter_department = function(department_name){

	$scope.search.departmentData.departmentName_TH = department_name;

 }

 $scope.reset_filter = function(){

      $scope.search = {};
      $scope.search.departmentData = {};
      search.departmentData.departmentName_TH == ''
 }

 $scope.gotoProfile = function (researcher_id) {


	 global_service.set_research_id(researcher_id);
	 // alert()

   $state.go('profileDetail.general');


 }



});
