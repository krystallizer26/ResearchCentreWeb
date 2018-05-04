angular.module('app', [ 'ngRoute' ])

angular.module('app')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('app').config(function($routeProvider) {
    $routeProvider
  
        .when("/general_2", {
            templateUrl : "/general_2/index.html"
        })
        .otherwise({
            templateUrl : "/general_2/index.html"
        });
});
angular.module('app').filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

angular.module('app').controller('index', function ($scope, $filter, $q,$http){

    $scope.init = function() {
        console.log('test MIX');

        $scope.text_search = '';
        $scope.researcherList = [];
        $scope.getResearcherList($scope.text_search);
    }

    $scope.this_group_name = function(data){
        alert(data);

        // clear data
        if ($scope.table_finance) {
            $scope.table_finance.settings().dataset = [];
            $scope.table_finance.reload();
        }
        // "ไทยพาณิชย์"
        // ------ Deposit
        $scope.scb_deposit_accOwner = null;
        $scope.scb_deposit_accNumber = null;
        $scope.scb_deposit_balance_before = null;
        $scope.scb_deposit_total_deposit = null;
        $scope.scb_deposit_total_withdraw = null;
        $scope.scb_deposit_balance_after = null;
        
        if(data != '') {
            $scope.groupNameSelected = data;
            $scope.getAgentReports($scope.groupNameSelected); 
            $scope.getBankAccountsReport($scope.groupNameSelected);
        }
        
    }
    $scope.getGroupName = function(){

        let formData = {};
        $http.post('proxy/getAllBankAccountGroupName', formData)
        .success(function(data, status, headers, config) {

            console.log(JSON.stringify(data));
            if(data.code != '999999') {
                
                alert("Can't get Group Name")
            }
            else {

                $scope.groupNameList = data.data
    
            }
        })
        .error(function(response, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
        });
    }

    $scope.getResearcherList = function(searchStr) {

        if (searchStr != '') {
            // SEARCH ......................

        } else {
            
            $http({
                method: 'POST',
                url: '/api/getAllResearcherPreview',
                form: {}
            })
            .then(function successCallback(response) {
                if(response.data.code != '999999') {
                    alert("เกิดข้อผิดพลาดในการอ่านรายชื่อนักวิจัย : " + JSON.stringify(response.data));
                } else {
                    $scope.researcherList = response.data.data;
                }
            }, function errorCallback(response) {
                alert( "failure message: " + JSON.stringify({data: response}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
            });
        }
    }

    $scope.updateAgentReport = function(rowInput) {

        rowInput.isEditing = false ;


        if (rowInput.credit_before.length == 0 ||
            rowInput.balance_before.length == 0 || 
            rowInput.deposit_before.length == 0 ||
            rowInput.withdraw_before.length == 0 ||
            rowInput.interest_before.length == 0 ||
            rowInput.fee_before.length == 0
        ){
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            $scope.text_alert = "กรุณากรอกข้อมูลให้ครบทุกช่อง"
        } else {
            let formData = {
                reportId: rowInput.reportId,
                credit_before: rowInput.credit_before,
                balance_before: rowInput.balance_before,
                deposit_before: rowInput.deposit_before,
                withdraw_before: rowInput.withdraw_before,
                interest_before: rowInput.interest_before,
                fee_before: rowInput.fee_before
            };
            let config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
            console.log(JSON.stringify(formData));
            $http.post('/updateAgentFinanceReport', formData, config)
                .success(function(data, status, headers, config) {
                    
                    if(data.code != '999999') {
                        console.log(JSON.stringify(data));
                        swal("เกิดข้อผิดพลาดในการ update รายงานการเงินของ Agent : " + JSON.stringify(data), {
                            icon: "error",
                        });
                    }
                    else {
                        swal("Update รายงานการเงินของ Agent สำเร็จ", {
                            icon: "success",
                        });
                        
                        $scope.getAgentReports($scope.groupNameSelected);   
                    }
                })
                .error(function(data, status, headers, config) {
                    alert( "failure message: " + JSON.stringify({data: data}) +"ไม่สามารถติดต่อเซิฟเวอร์ได้ ติดต่อแอดมิน");
                });
        }
    }

    // ###############################
    //    PAGE 2
    // ###############################
    $scope.agent_search = function(){
        //buf_memberName  =  string member name
      
        alert($scope.buf_agentName);
        $scope.getMemberDetailReport_all($scope.buf_agentName);
        $scope.getAgentReportsByName($scope.buf_agentName);
    }

});